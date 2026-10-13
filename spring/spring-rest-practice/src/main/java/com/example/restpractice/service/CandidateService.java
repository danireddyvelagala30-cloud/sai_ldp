package com.example.restpractice.service;

import com.example.restpractice.model.Candidate;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class CandidateService {

    private final ConcurrentHashMap<Long, Candidate> candidates = new ConcurrentHashMap<>();
    private final AtomicLong nextId = new AtomicLong(1);

    public List<Candidate> findAll() {
        return candidates.values().stream()
                .sorted(Comparator.comparing(Candidate::getId))
                .toList();
    }

    public Optional<Candidate> findById(Long id) {
        return Optional.ofNullable(candidates.get(id));
    }

    public Candidate create(Candidate candidate) {
        Long id = nextId.getAndIncrement();
        Candidate newCandidate = new Candidate(
                id,
                candidate.getName(),
                candidate.getEmail(),
                candidate.getJobTitle()
        );
        candidates.put(id, newCandidate);
        return newCandidate;
    }

    public Optional<Candidate> update(Long id, Candidate candidate) {
        return Optional.ofNullable(candidates.computeIfPresent(id, (candidateId, existing) -> {
            existing.setName(candidate.getName());
            existing.setEmail(candidate.getEmail());
            existing.setJobTitle(candidate.getJobTitle());
            return existing;
        }));
    }

    public boolean delete(Long id) {
        return candidates.remove(id) != null;
    }
}
