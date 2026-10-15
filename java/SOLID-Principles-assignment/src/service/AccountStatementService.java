package service;

import account.BankAccount;

public class AccountStatementService {

    public void generateStatement(BankAccount account) {

        System.out.println();
        System.out.println("----- ACCOUNT STATEMENT -----");
        System.out.println(
                "Account Number: " +
                account.getAccountNumber()
        );
        System.out.println(
                "Account Holder: " +
                account.getAccountHolder()
        );
        System.out.println(
                "Balance: " +
                account.getBalance()
        );
        System.out.println("-----------------------------");
    }
}