package account;

import interfaces.Withdrawable;

public class SavingsAccount extends BankAccount implements Withdrawable {

    public SavingsAccount(
            int accountNumber,
            String accountHolder,
            double balance) {

        super(accountNumber, accountHolder, balance);
    }

    @Override
    public void withdraw(double amount) {

        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Savings withdrawal: " + amount);
        } else {
            System.out.println("Insufficient balance");
        }
    }

    public double calculateInterest() {
        return balance * 0.04;
    }
}
