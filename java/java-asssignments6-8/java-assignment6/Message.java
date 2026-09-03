public class Message {

    public Message(String text) {
        System.out.println("Constructor called: " + text);
    }

    public static void main(String[] args) {


        Message[] messages = new Message[5];

        System.out.println("Array created.");

        System.out.println("Program finished.");
    }
}
