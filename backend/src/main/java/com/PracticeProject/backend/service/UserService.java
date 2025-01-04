package com.PracticeProject.backend.service;

import com.PracticeProject.backend.entity.User;
import com.PracticeProject.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@AllArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String username, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email is already registered");
        }
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username is already taken");
        }
        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password)); // Hash the password
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(password, user.getPassword())) { // Verify password
            throw new IllegalArgumentException("Invalid email or password");
        }
        return user;
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

public void updateUserProfile(Long id, User updatedUser) {
    User existingUser = userRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

    // Update username if provided
    if (updatedUser.getUsername() != null && !updatedUser.getUsername().isEmpty()) {
        existingUser.setUsername(updatedUser.getUsername());
    }

    // Update password if provided
    if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
        String hashedPassword = passwordEncoder.encode(updatedUser.getPassword());
        existingUser.setPassword(hashedPassword);
    }

    userRepository.save(existingUser);
}

}
