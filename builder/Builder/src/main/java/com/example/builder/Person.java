package com.example.builder;

import java.util.Objects;


public final class Person {
    private final String firstName;
    private final String lastName;
    private final int age;
    private final String address;
    private final String email;
    private final String phoneNumber;
    private final String gender;
    private final String occupation;
    private final String nationality;
    private final String maritalStatus;

    private Person(Builder builder) {
        firstName = builder.firstName;
        lastName = builder.lastName;
        age = builder.age;
        address = builder.address;
        email = builder.email;
        phoneNumber = builder.phoneNumber;
        gender = builder.gender;
        occupation = builder.occupation;
        nationality = builder.nationality;
        maritalStatus = builder.maritalStatus;
    }

    public static Builder builder(String firstName, String lastName) {
        return new Builder(firstName, lastName);
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getAge() {
        return age;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getGender() {
        return gender;
    }

    public String getOccupation() {
        return occupation;
    }

    public String getNationality() {
        return nationality;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }

    @Override
    public String toString() {
        return "Person{" +
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age=" + age +
                ", address='" + address + '\'' +
                ", email='" + email + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", gender='" + gender + '\'' +
                ", occupation='" + occupation + '\'' +
                ", nationality='" + nationality + '\'' +
                ", maritalStatus='" + maritalStatus + '\'' +
                '}';
    }

    public static final class Builder {
        private final String firstName;
        private final String lastName;
        private int age;
        private String address;
        private String email;
        private String phoneNumber;
        private String gender;
        private String occupation;
        private String nationality;
        private String maritalStatus;

        private Builder(String firstName, String lastName) {
            this.firstName = requireText(firstName, "firstName");
            this.lastName = requireText(lastName, "lastName");
        }

        public Builder age(int age) {
            if (age < 0) {
                throw new IllegalArgumentException("age cannot be negative");
            }
            this.age = age;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder phoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
            return this;
        }

        public Builder gender(String gender) {
            this.gender = gender;
            return this;
        }

        public Builder occupation(String occupation) {
            this.occupation = occupation;
            return this;
        }

        public Builder nationality(String nationality) {
            this.nationality = nationality;
            return this;
        }

        public Builder maritalStatus(String maritalStatus) {
            this.maritalStatus = maritalStatus;
            return this;
        }

        public Person build() {
            return new Person(this);
        }

        private static String requireText(String value, String fieldName) {
            Objects.requireNonNull(value, fieldName + " cannot be null");
            if (value.isBlank()) {
                throw new IllegalArgumentException(fieldName + " cannot be blank");
            }
            return value;
        }
    }
}
