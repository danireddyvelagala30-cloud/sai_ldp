package com.assignment10;

import java.util.NoSuchElementException;

public class SList<T> {
    private Link<T> head;
    private int size;

    public SList() {
        this.head = null;
        this.size = 0;
    }

    public SListIterator iterator() {
        return new SListIterator();
    }

    @Override
    public String toString() {
        if (head == null) {
            return "[]";
        }

        StringBuilder sb = new StringBuilder("[");
        Link<T> current = head;

        while (current != null) {
            sb.append(current.data);
            if (current.next != null) {
                sb.append(", ");
            }
            current = current.next;
        }

        sb.append("]");
        return sb.toString();
    }

    private static class Link<T> {
        private final T data;
        private Link<T> next;

        private Link(T data) {
            this.data = data;
        }
    }

    public class SListIterator {
        private Link<T> current;
        private Link<T> previous;
        private Link<T> lastReturned;

        private SListIterator() {
            this.current = head;
            this.previous = null;
            this.lastReturned = null;
        }

        public boolean hasNext() {
            return current != null;
        }

        public T next() {
            if (!hasNext()) {
                throw new NoSuchElementException("No more elements in the list.");
            }

            lastReturned = current;
            T value = current.data;
            previous = current;
            current = current.next;
            return value;
        }

        public void add(T item) {
            Link<T> newNode = new Link<>(item);

            if (head == null) {
                head = newNode;
                current = head;
                previous = null;
            } else if (previous == null) {
                newNode.next = head;
                head = newNode;
                current = head;
            } else {
                newNode.next = current;
                previous.next = newNode;
                current = newNode;
            }

            lastReturned = null;
            size++;
        }

        public void remove() {
            if (lastReturned == null) {
                throw new IllegalStateException("remove() called before next().");
            }

            if (lastReturned == head) {
                head = head.next;
            } else {
                Link<T> node = head;
                while (node != null && node.next != lastReturned) {
                    node = node.next;
                }

                if (node == null) {
                    throw new IllegalStateException("Unable to locate the node to remove.");
                }

                node.next = lastReturned.next;
            }

            if (current == lastReturned) {
                current = lastReturned.next;
            }

            previous = null;
            lastReturned = null;
            size--;
        }
    }
}
