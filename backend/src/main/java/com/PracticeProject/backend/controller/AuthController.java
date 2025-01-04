package com.PracticeProject.backend.controller;

import com.PracticeProject.backend.dto.LoginRequest;
import com.PracticeProject.backend.dto.LoginResponse;
import com.PracticeProject.backend.dto.RegisterRequest;
import com.PracticeProject.backend.entity.User;
import com.PracticeProject.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // Login Endpoint
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok().body(
                    new LoginResponse("Login successful", user.getUsername(), user.getEmail(),user.getId())
            );
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(new LoginResponse(e.getMessage(), null, null,null));
        }
    }

    // Registration Endpoint
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterRequest registerRequest) {
        try {
            User newUser = userService.registerUser(registerRequest.getUsername(), registerRequest.getEmail(), registerRequest.getPassword());

            return ResponseEntity.ok().body(new LoginResponse("Registration successful", newUser.getUsername(),
                    newUser.getEmail(),newUser.getId()));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new LoginResponse(e.getMessage(), null, null,null));
        }
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<User> getProfile(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PutMapping("/profile/{id}")
    public ResponseEntity<String> updateProfile(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            userService.updateUserProfile(id, updatedUser);
            return ResponseEntity.ok("Profile updated successfully!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
