package src.OpenClosedPrinciple;

public class UpiPayment implements Payment {

    @Override
    public void pay() {
        System.out.println("Payment using UPI");
    }
}