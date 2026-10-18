package account;

public class FixedDepositAccount extends BankAccount {

    public FixedDepositAccount(
            int accountNumber,
            String accountHolder,
            double balance) {

        super(accountNumber, accountHolder, balance);
    }

    public double calculateInterest() {
        return balance * 0.07;
    }
}