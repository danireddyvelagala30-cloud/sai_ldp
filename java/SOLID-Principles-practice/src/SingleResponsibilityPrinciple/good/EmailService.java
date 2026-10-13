package src.SingleResponsibilityPrinciple.good;
public class EmailService {

    public void sendEmail(Student student) {
        System.out.println("Sending email to: " + student.getName());
    }
}