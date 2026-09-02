import src.OpenClosedPrinciple.PaymentService;
import src.OpenClosedPrinciple.UpiPayment;

public class Main {
    public static void main(String[] args) {
        PaymentService paymentService = new PaymentService();
        paymentService.processPayment(new UpiPayment());
    }
}
