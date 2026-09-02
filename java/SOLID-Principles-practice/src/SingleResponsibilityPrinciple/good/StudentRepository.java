package src.SingleResponsibilityPrinciple.good;

public class StudentRepository {

    public void save(Student student) {
        System.out.println("Saving student: " + student.getName());
    }
}