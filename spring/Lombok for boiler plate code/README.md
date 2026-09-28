# Lombok Practice

This project demonstrates how Lombok removes common Java boilerplate code.

## Lombok annotations used

| Annotation | Generated code |
| --- | --- |
| `@Getter` and `@Setter` | Getters and setters |
| `@ToString` | `toString()` |
| `@Data` | Getters, setters, `toString()`, `equals()`, and `hashCode()` |
| `@Builder` | Fluent builder API |
| `@NoArgsConstructor` | No-argument constructor |
| `@AllArgsConstructor` | Constructor with every field |
| `@Value` | Immutable class |
| `@Slf4j` | Logger named `log` |

## Run

```text
mvn clean compile exec:java
```

Enable annotation processing in IntelliJ IDEA:

`Settings -> Build, Execution, Deployment -> Compiler -> Annotation Processors -> Enable annotation processing`

## Practice exercises

1. Add a `phoneNumber` field to `Student`.
2. Create an `Instructor` class using `@Data` and `@Builder`.
3. Add a `List<Course>` field to `Student`.
4. Replace `@Getter` and `@Setter` on `Student` with `@Data`, then compare the generated behavior.
5. Add `@Builder.Default` to give a new student an empty skills list.
6. Add `@EqualsAndHashCode(onlyExplicitlyIncluded = true)` and decide which fields identify a student.
