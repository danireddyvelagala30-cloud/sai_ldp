package practice.spring;

public class CustomLifecycleBean {

    public void customInit() {
        System.out.println("3. @Bean initMethod");
    }

    public void customDestroy() {
        System.out.println("6. @Bean destroyMethod");
    }
}
