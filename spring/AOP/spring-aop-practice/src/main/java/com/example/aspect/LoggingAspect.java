package com.example.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {
    @Before("execution(* com.example.service.UserService.createUser(..))")
    public void beforeCreateUser() {
        System.out.println("[Before] About to create a user");
    }

    @After("execution(* com.example.service.UserService.updateUser(..))")
    public void afterUpdateUser() {
        System.out.println("[After] Update method finished (successfully or exceptionally)");
    }

    @Around("execution(* com.example.service.UserService.deleteUser(..))")
    public Object aroundDeleteUser(ProceedingJoinPoint joinPoint) throws Throwable {
        System.out.println("[Around] Before " + joinPoint.getSignature().getName());
        try {
            Object result = joinPoint.proceed();
            System.out.println("[Around] After " + joinPoint.getSignature().getName());
            return result;
        } catch (Throwable exception) {
            System.out.println("[Around] Method threw: " + exception.getMessage());
            throw exception;
        }
    }

    @AfterReturning(
            pointcut = "execution(* com.example.service.UserService.createUser(..))",
            returning = "result")
    public void afterCreateUserReturns(Object result) {
        System.out.println("[AfterReturning] Result: " + result);
    }

    @AfterThrowing(
            pointcut = "execution(* com.example.service.UserService.updateUser(..))",
            throwing = "exception")
    public void afterUpdateUserThrows(IllegalArgumentException exception) {
        System.out.println("[AfterThrowing] Update failed: " + exception.getMessage());
    }
}
