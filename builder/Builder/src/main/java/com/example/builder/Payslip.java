package com.example.builder;

import java.math.BigDecimal;
import java.util.Objects;


public final class Payslip {
    private final String employeeName;
    private final String payPeriod;
    private final BigDecimal basic;
    private final BigDecimal hra;
    private final BigDecimal da;
    private final BigDecimal ta;
    private final BigDecimal otherAllowances;
    private final BigDecimal providentFund;
    private final BigDecimal tax;
    private final BigDecimal otherDeductions;

    private Payslip(Builder builder) {
        employeeName = builder.employeeName;
        payPeriod = builder.payPeriod;
        basic = builder.basic;
        hra = builder.hra;
        da = builder.da;
        ta = builder.ta;
        otherAllowances = builder.otherAllowances;
        providentFund = builder.providentFund;
        tax = builder.tax;
        otherDeductions = builder.otherDeductions;
    }

    public static Builder builder(String employeeName, String payPeriod) {
        return new Builder(employeeName, payPeriod);
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public String getPayPeriod() {
        return payPeriod;
    }

    public BigDecimal getBasic() {
        return basic;
    }

    public BigDecimal getHra() {
        return hra;
    }

    public BigDecimal getDa() {
        return da;
    }

    public BigDecimal getTa() {
        return ta;
    }

    public BigDecimal getOtherAllowances() {
        return otherAllowances;
    }

    public BigDecimal getProvidentFund() {
        return providentFund;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public BigDecimal getOtherDeductions() {
        return otherDeductions;
    }

    public BigDecimal getGrossEarnings() {
        return basic.add(hra).add(da).add(ta).add(otherAllowances);
    }

    public BigDecimal getTotalDeductions() {
        return providentFund.add(tax).add(otherDeductions);
    }

    public BigDecimal getNetPay() {
        return getGrossEarnings().subtract(getTotalDeductions());
    }

    @Override
    public String toString() {
        return "Payslip{" +
                "employeeName='" + employeeName + '\'' +
                ", payPeriod='" + payPeriod + '\'' +
                ", basic=" + basic +
                ", hra=" + hra +
                ", da=" + da +
                ", ta=" + ta +
                ", otherAllowances=" + otherAllowances +
                ", grossEarnings=" + getGrossEarnings() +
                ", providentFund=" + providentFund +
                ", tax=" + tax +
                ", otherDeductions=" + otherDeductions +
                ", totalDeductions=" + getTotalDeductions() +
                ", netPay=" + getNetPay() +
                '}';
    }

    public static final class Builder {
        private final String employeeName;
        private final String payPeriod;
        private BigDecimal basic = BigDecimal.ZERO;
        private BigDecimal hra = BigDecimal.ZERO;
        private BigDecimal da = BigDecimal.ZERO;
        private BigDecimal ta = BigDecimal.ZERO;
        private BigDecimal otherAllowances = BigDecimal.ZERO;
        private BigDecimal providentFund = BigDecimal.ZERO;
        private BigDecimal tax = BigDecimal.ZERO;
        private BigDecimal otherDeductions = BigDecimal.ZERO;

        private Builder(String employeeName, String payPeriod) {
            this.employeeName = requireText(employeeName, "employeeName");
            this.payPeriod = requireText(payPeriod, "payPeriod");
        }

        public Builder basic(BigDecimal basic) {
            this.basic = requireNonNegative(basic, "basic");
            return this;
        }

        public Builder hra(BigDecimal hra) {
            this.hra = requireNonNegative(hra, "hra");
            return this;
        }

        public Builder da(BigDecimal da) {
            this.da = requireNonNegative(da, "da");
            return this;
        }

        public Builder ta(BigDecimal ta) {
            this.ta = requireNonNegative(ta, "ta");
            return this;
        }

        public Builder otherAllowances(BigDecimal otherAllowances) {
            this.otherAllowances = requireNonNegative(otherAllowances, "otherAllowances");
            return this;
        }

        public Builder providentFund(BigDecimal providentFund) {
            this.providentFund = requireNonNegative(providentFund, "providentFund");
            return this;
        }

        public Builder tax(BigDecimal tax) {
            this.tax = requireNonNegative(tax, "tax");
            return this;
        }

        public Builder otherDeductions(BigDecimal otherDeductions) {
            this.otherDeductions = requireNonNegative(otherDeductions, "otherDeductions");
            return this;
        }

        public Payslip build() {
            return new Payslip(this);
        }

        private static String requireText(String value, String fieldName) {
            Objects.requireNonNull(value, fieldName + " cannot be null");
            if (value.isBlank()) {
                throw new IllegalArgumentException(fieldName + " cannot be blank");
            }
            return value;
        }

        private static BigDecimal requireNonNegative(BigDecimal value, String fieldName) {
            Objects.requireNonNull(value, fieldName + " cannot be null");
            if (value.signum() < 0) {
                throw new IllegalArgumentException(fieldName + " cannot be negative");
            }
            return value;
        }
    }
}
