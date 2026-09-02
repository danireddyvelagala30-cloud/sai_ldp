package service;

import account.BankAccount;

public class EmailService {

    public void sendAccountCreatedEmail(BankAccount account) {

        System.out.println(
                "Email sent to " +
                account.getAccountHolder()
        );
    }
}