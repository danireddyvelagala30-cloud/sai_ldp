import React, { useState, useEffect, useMemo } from 'react';
import { Header } from '../../organisms/Header';
import { ContractsTable } from '../../organisms/ContractsTable';
import { SummaryCard } from '../../organisms/SummaryCard';
import { Contract } from '../../types/Contract';
import { getContracts } from '../../services/api';
import { Button } from '../../atoms/Button';

export const NewCashKickPage: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContracts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getContracts();
      setContracts(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load contracts from backend server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const sortedContracts = useMemo(
    () => [...contracts].sort((a, b) => a.amount - b.amount),
    [contracts]
  );

  const cumulativeTotals = useMemo(() => {
    const totals = [0];
    let sum = 0;
    for (const c of sortedContracts) {
      sum += c.amount;
      totals.push(sum);
    }
    return totals;
  }, [sortedContracts]);

  const totalAvailableAmount = useMemo(
    () => contracts.reduce((sum, contract) => sum + contract.amount, 0),
    [contracts]
  );

  const selectedContracts = useMemo(
    () => contracts.filter((contract) => selectedIds.includes(contract.id)),
    [contracts, selectedIds]
  );

  const selectedTotal = useMemo(
    () => selectedContracts.reduce((sum, c) => sum + c.amount, 0),
    [selectedContracts]
  );

  const [sliderValue, setSliderValue] = useState<number>(0);

  useEffect(() => {
    setSliderValue(selectedTotal);
  }, [selectedTotal]);

  const handleSliderChange = (targetValue: number) => {
    if (targetValue === 0) {
      setSelectedIds([]);
      return;
    }
    let closestIndex = 0;
    let minDiff = Infinity;
    for (let i = 0; i < cumulativeTotals.length; i++) {
      const diff = Math.abs(cumulativeTotals[i] - targetValue);
      if (diff <= minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    }
    const newSelected = sortedContracts.slice(0, closestIndex).map((c) => c.id);
    setSelectedIds(newSelected);
  };

  const allSelected = selectedIds.length === contracts.length && contracts.length > 0;

  const handleToggleAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(contracts.map((c) => c.id));
    }
  };

  const handleToggleOne = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleReset = () => {
    setSelectedIds([]);
    setSliderValue(0);
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0) {
      alert('Please select at least one contract to initiate a cash kick.');
      return;
    }
    alert(`Successfully submitted Cash Kick for ${selectedIds.length} contract(s)!`);
  };

  return (
    <div className="content-grid">
      <Header
        title="New cash kick"
        subtitle="Let's setup a new cash kick to power your SaaS"
        onBack={() => window.history.back()}
      />

      {loading && (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#8a84ff' }}>
          Fetching contracts from backend server...
        </div>
      )}

      {error && (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px' }}>
          <div style={{ color: '#ff6b6b', marginBottom: '16px' }}>⚠️ {error}</div>
          <Button variant="primary" onClick={fetchContracts}>
            Retry Fetching Contracts
          </Button>
        </div>
      )}

      {!loading && !error && (
        <div className="grid-panels">
          <ContractsTable
            contracts={contracts}
            selectedIds={selectedIds}
            allSelected={allSelected}
            onToggleAll={handleToggleAll}
            onToggleOne={handleToggleOne}
          />
          <SummaryCard
            selectedCount={selectedIds.length}
            selectedTotal={selectedTotal}
            maxTotal={totalAvailableAmount || 880000}
            sliderValue={sliderValue}
            onSliderChange={handleSliderChange}
            onReset={handleReset}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};
