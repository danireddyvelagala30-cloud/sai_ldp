package repository;

import account.BankAccount;

public class PostgreSQLAccountRepository
        implements AccountRepository {

    @Override
    public void save(BankAccount account) {

        System.out.println(
                "Account " +
                account.getAccountNumber() +
                " saved to PostgreSQL database."
        );
    }
}