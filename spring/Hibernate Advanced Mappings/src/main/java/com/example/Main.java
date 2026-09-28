package com.example;

import com.example.entity.Department;
import com.example.entity.Employee;
import com.example.entity.EmployeeProfile;
import com.example.entity.Project;
import com.example.util.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.Transaction;

public class Main {

    public static void main(String[] args) {
        Department engineering = new Department("Engineering");
        Employee alice = new Employee("Alice");
        Employee bob = new Employee("Bob");
        EmployeeProfile aliceProfile =
                new EmployeeProfile("alice@example.com", "555-0101");
        Project payroll = new Project("Payroll System");
        Project mobileApp = new Project("Mobile Application");

        engineering.addEmployee(alice);
        engineering.addEmployee(bob);
        alice.assignProfile(aliceProfile);
        alice.addProject(payroll);
        alice.addProject(mobileApp);
        bob.addProject(payroll);

        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(engineering);
            session.persist(payroll);
            session.persist(mobileApp);
            transaction.commit();
        }

        try (Session session = HibernateUtil.getSessionFactory().openSession()) {
            Department savedDepartment = session.createQuery(
                            "select distinct d from Department d " +
                                    "left join fetch d.employees " +
                                    "where d.name = :name",
                            Department.class)
                    .setParameter("name", "Engineering")
                    .uniqueResult();

            System.out.println("\nDepartment: " + savedDepartment.getName());
            for (Employee employee : savedDepartment.getEmployees()) {
                System.out.println("Employee: " + employee.getName());
                System.out.println("  Profile: " +
                        (employee.getProfile() == null
                                ? "none"
                                : employee.getProfile().getEmail()));
                System.out.println("  Projects: " +
                        // Access while the session is open so the lazy collection is initialized.
                        employee.getProjects().stream()
                                .map(Project::getName)
                                .toList());
            }
        } finally {
            HibernateUtil.shutdown();
        }
    }
}
