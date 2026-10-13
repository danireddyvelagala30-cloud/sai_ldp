package src.DependencyInversionPrinciple.Bad;

public class NotificationService {

    private EmailService emailService = new EmailService();

    public void sendNotification() {
        emailService.sendEmail();
    }
}
