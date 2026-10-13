package src.SingleResponsibilityPrinciple.good;

public class StudentReport {

    public void generate(Student student) {
        System.out.println(
                "Generating report for: " + student.getName()
        );
    }
}