import account.CurrentAccount;
import account.FixedDepositAccount;
import account.SavingsAccount;
import repository.AccountRepository;
import repository.MySQLAccountRepository;
import service.AccountStatementService;
import service.BankService;
import service.EmailService;

public class Main {

    public static void main(String[] args) {



        SavingsAccount savingsAccount =
                new SavingsAccount(
                        101,
                        "Sai",
                        10000
                );

        System.out.println("Savings Account");
        System.out.println(
                "Balance: " +
                savingsAccount.getBalance()
        );

        savingsAccount.deposit(2000);
        savingsAccount.withdraw(3000);

        System.out.println(
                "Interest: " +
                savingsAccount.calculateInterest()
        );




        CurrentAccount currentAccount =
                new CurrentAccount(
                        102,
                        "Ravi",
                        20000
                );

        System.out.println("\nCurrent Account");

        currentAccount.deposit(5000);
        currentAccount.withdraw(4000);
        currentAccount.transfer(2000);




        FixedDepositAccount fixedDepositAccount =
                new FixedDepositAccount(
                        103,
                        "Kiran",
                        50000
                );

        System.out.println("\nFixed Deposit Account");

        System.out.println(
                "Interest: " +
                fixedDepositAccount.calculateInterest()
        );



        AccountRepository repository =
                new MySQLAccountRepository();

        BankService bankService =
                new BankService(repository);

        bankService.saveAccount(savingsAccount);




        EmailService emailService =
                new EmailService();

        emailService.sendAccountCreatedEmail(
                savingsAccount
        );




        AccountStatementService statementService =
                new AccountStatementService();

        statementService.generateStatement(
                savingsAccount
        );
    }
}