# Spring Beans: Scopes and Lifecycle

Run the example with:

```bash
mvn clean compile exec:java
```

## What to practice

- `SingletonBean` uses the default singleton scope. Every lookup returns the same object.
- `PrototypeBean` creates a new object for every lookup.
- `LifecycleBean` demonstrates `@PostConstruct`, `InitializingBean`, `@PreDestroy`, and `DisposableBean`.
- `CustomLifecycleBean` demonstrates `@Bean(initMethod = ..., destroyMethod = ...)`.

Expected scope output:

```text
Singleton same object: true
Prototype same object: false
```

Spring does not automatically call destroy callbacks for prototype beans because it does not manage their complete lifecycle after creation.
