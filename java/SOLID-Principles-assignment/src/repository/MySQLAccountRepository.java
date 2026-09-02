package repository;

import account.BankAccount;

public class MySQLAccountRepository implements AccountRepository {

    @Override
    public void save(BankAccount account) {

        System.out.println(
                "Account " +
                account.getAccountNumber() +
                " saved to MySQL database."
        );
    }
}