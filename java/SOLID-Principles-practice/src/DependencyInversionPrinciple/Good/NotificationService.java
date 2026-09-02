package src.DependencyInversionPrinciple.Good;

public class NotificationService {

    private final Notification notification;

    public NotificationService(Notification notification) {
        this.notification = notification;
    }

    public void sendNotification() {
        notification.send();
    }
}
