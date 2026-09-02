package service;

import account.BankAccount;
import repository.AccountRepository;

public class BankService {

    private final AccountRepository repository;

    public BankService(AccountRepository repository) {
        this.repository = repository;
    }

    public void saveAccount(BankAccount account) {

        repository.save(account);
    }
}