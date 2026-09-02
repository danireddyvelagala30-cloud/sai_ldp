package practice.app;

import Arrays.ArrayPractice;
import ClassesAndObjects.Student;
import CollectionsAPI.ListPractice;
import ConditionalStatements.StudentGrade;
import Exceptions.ExceptionPractice;
import HashMap.HashMapPractice;
import HashSet.HashSetPractice;
import JavaFeaturesandBasics.Calculator;
import JavaFeaturesandBasics.StudentInfo;
import Loops.LoopPractice;
import Strings.StringPractice;
import src.Iterator.IteratorPractice;
import src.Lambda.LambdaPractice;
import src.RegEx.RegexPractice;
import src.Threads.ThreadPractice;

public class RunAllExamples {
    public static void main(String[] args) {
        run("ArrayPractice", () -> ArrayPractice.main(args));
        run("Student", () -> Student.main(args));
        run("ListPractice", () -> ListPractice.main(args));
        run("StudentGrade", () -> StudentGrade.main(args));
        run("ExceptionPractice", () -> ExceptionPractice.main(args));
        run("HashMapPractice", () -> HashMapPractice.main(args));
        run("HashSetPractice", () -> HashSetPractice.main(args));
        run("IteratorPractice", () -> IteratorPractice.main(args));
        run("Calculator", () -> Calculator.main(args));
        run("StudentInfo", () -> StudentInfo.main(args));
        run("LambdaPractice", () -> LambdaPractice.main(args));
        run("LoopPractice", () -> LoopPractice.main(args));
        run("Main", () -> Main.main(args));
        run("RegexPractice", () -> RegexPractice.main(args));
        run("StringPractice", () -> StringPractice.main(args));
        run("ThreadPractice", () -> ThreadPractice.main(args));
    }

    private static void run(String title, Runnable example) {
        System.out.println("\n--- " + title + " ---");
        example.run();
    }
}
