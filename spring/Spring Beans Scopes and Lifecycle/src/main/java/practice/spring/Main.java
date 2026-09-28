package practice.spring;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {

    public static void main(String[] args) {
        try (AnnotationConfigApplicationContext context =
                     new AnnotationConfigApplicationContext(AppConfig.class)) {

            SingletonBean singletonOne = context.getBean(SingletonBean.class);
            SingletonBean singletonTwo = context.getBean(SingletonBean.class);
            System.out.println("Singleton same object: " + (singletonOne == singletonTwo));

            PrototypeBean prototypeOne = context.getBean(PrototypeBean.class);
            PrototypeBean prototypeTwo = context.getBean(PrototypeBean.class);
            System.out.println("Prototype same object: " + (prototypeOne == prototypeTwo));
        }
    }
}
