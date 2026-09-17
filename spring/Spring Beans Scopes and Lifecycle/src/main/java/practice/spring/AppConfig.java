package practice.spring;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan("practice.spring")
public class AppConfig {

    @Bean(initMethod = "customInit", destroyMethod = "customDestroy")
    public CustomLifecycleBean customLifecycleBean() {
        return new CustomLifecycleBean();
    }
}
