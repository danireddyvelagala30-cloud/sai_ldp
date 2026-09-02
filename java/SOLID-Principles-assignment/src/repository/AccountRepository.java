package repository;

import account.BankAccount;

public interface AccountRepository {

    void save(BankAccount account);
}