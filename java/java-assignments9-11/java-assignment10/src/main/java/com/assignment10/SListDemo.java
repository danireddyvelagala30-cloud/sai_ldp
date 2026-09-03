package com.assignment10;

public class SListDemo {
    public static void main(String[] args) {
        SList<String> names = new SList<>();
        SList<String>.SListIterator nameIterator = names.iterator();

        nameIterator.add("Alice");
        nameIterator.add("Bob");
        nameIterator.add("Charlie");

        System.out.println("Initial list: " + names);

        nameIterator = names.iterator();
        while (nameIterator.hasNext()) {
            String name = nameIterator.next();
            System.out.println("Visited: " + name);

            if ("Bob".equals(name)) {
                nameIterator.remove();
                System.out.println("After removing Bob: " + names);
            }
        }

        SList<Integer> numbers = new SList<>();
        SList<Integer>.SListIterator numberIterator = numbers.iterator();
        numberIterator.add(10);
        numberIterator.add(20);
        numberIterator.add(30);

        System.out.println("Numbers list: " + numbers);
    }
}
