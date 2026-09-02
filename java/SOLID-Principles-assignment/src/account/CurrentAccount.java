package account;

import interfaces.Transferable;
import interfaces.Withdrawable;

public class CurrentAccount
        extends BankAccount
        implements Withdrawable, Transferable {

    public CurrentAccount(
            int accountNumber,
            String accountHolder,
            double balance) {

        super(accountNumber, accountHolder, balance);
    }

    @Override
    public void withdraw(double amount) {

        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Current account withdrawal: " + amount);
        } else {
            System.out.println("Insufficient balance");
        }
    }

    @Override
    public void transfer(double amount) {

        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Transferred: " + amount);
        } else {
            System.out.println("Transfer failed");
        }
    }
}