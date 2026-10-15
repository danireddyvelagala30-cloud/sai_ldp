public class MessageArrayWithObjects {

    static class Message {
        public Message(String text) {
        System.out.println("Constructor called: " + text);
        }
    }

    public static void main(String[] args) {

        Message[] messages = new Message[5];

        System.out.println("Creating objects...\n");

        messages[0] = new Message("Object 1");
        messages[1] = new Message("Object 2");
        messages[2] = new Message("Object 3");
        messages[3] = new Message("Object 4");
        messages[4] = new Message("Object 5");

        System.out.println("\nAll objects created.");
    }
}
