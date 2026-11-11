package com.example.builder;

import java.math.BigDecimal;

public class Main {
    public static void main(String[] args) {
        demonstrateImmutablePerson();
        demonstrateSetters();
        demonstratePayslip();
    }

    private static void demonstrateImmutablePerson() {
        Person.Builder personBuilder = Person.builder("Ada", "Lovelace")
                .age(36)
                .address("12 Analytical Engine Way")
                .email("ada@example.com")
                .phoneNumber("555-0100")
                .gender("Female")
                .occupation("Mathematician")
                .nationality("British")
                .maritalStatus("Married");

        Person person = personBuilder.build();
        personBuilder.address("A different address");

        System.out.println("Builder-based immutable person:");
        System.out.println(person);
        System.out.println("Built person's address remains: " + person.getAddress());
    }

    private static void demonstrateSetters() {
        MutablePerson person = new MutablePerson();
        person.setFirstName("Grace");
        person.setLastName("Hopper");
        person.setAge(85);
        person.setAddress("1 Compiler Lane");
        person.setEmail("grace@example.com");
        person.setPhoneNumber("555-0101");
        person.setGender("Female");
        person.setOccupation("Computer Scientist");
        person.setNationality("American");
        person.setMaritalStatus("Widowed");

        System.out.println("\nSetter-based mutable person:");
        System.out.println(person);
        person.setFirstName("Amazing Grace");
        System.out.println("After changing first name with a setter: " + person.getFirstName());
    }

    private static void demonstratePayslip() {
        Payslip payslip = Payslip.builder("Grace Hopper", "October 2026")
                .basic(new BigDecimal("50000.00"))
                .hra(new BigDecimal("20000.00"))
                .da(new BigDecimal("5000.00"))
                .ta(new BigDecimal("2500.00"))
                .otherAllowances(new BigDecimal("1500.00"))
                .providentFund(new BigDecimal("6000.00"))
                .tax(new BigDecimal("8000.00"))
                .otherDeductions(new BigDecimal("500.00"))
                .build();

        System.out.println("\nPayslip built with components:");
        System.out.println(payslip);
    }
}
