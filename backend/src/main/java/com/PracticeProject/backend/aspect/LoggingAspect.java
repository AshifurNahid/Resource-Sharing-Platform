package com.PracticeProject.backend.aspect;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

    private static final Logger log = LoggerFactory.getLogger(LoggingAspect.class);

    // Pointcut for login method
    @After("execution(* com.PracticeProject.backend.controller.AuthController.login(..))")
    public void logAfterLogin(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        if (args[0] instanceof com.PracticeProject.backend.dto.LoginRequest) {
            com.PracticeProject.backend.dto.LoginRequest loginRequest = (com.PracticeProject.backend.dto.LoginRequest) args[0];
            log.info("User login attempt with email: {}", loginRequest.getEmail());
        } else {
            log.warn("Unexpected argument type in logAfterLogin: {}", args[0]);
        }
    }


    // Pointcut for register method
    @After("execution(* com.PracticeProject.backend.controller.AuthController.register(..))")
    public void logAfterRegister(JoinPoint joinPoint) {
        Object[] args = joinPoint.getArgs();
        log.info("New user registration attempt with username: {}",
                ((com.PracticeProject.backend.dto.RegisterRequest) args[0]).getUsername());
    }

    // Pointcut for getProfile method
    @After("execution(* com.PracticeProject.backend.controller.AuthController.getProfile(..))")
    public void logAfterGetProfile(JoinPoint joinPoint) {
        Long userId = (Long) joinPoint.getArgs()[0];
        log.info("Fetching profile details for user ID: {}", userId);
    }


    // Pointcut for updateProfile method
    @After("execution(* com.PracticeProject.backend.controller.AuthController.updateProfile(..))")
    public void logAfterUpdateProfile(JoinPoint joinPoint) {
        Long userId = (Long) joinPoint.getArgs()[0];
        log.info("User with ID {} updated their profile", userId);
    }
}
