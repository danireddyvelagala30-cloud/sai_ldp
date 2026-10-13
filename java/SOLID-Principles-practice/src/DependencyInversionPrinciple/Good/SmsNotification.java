package src.DependencyInversionPrinciple.Good;

public class SmsNotification implements Notification {

    @Override
    public void send() {
        System.out.println("Sending SMS");
    }
}