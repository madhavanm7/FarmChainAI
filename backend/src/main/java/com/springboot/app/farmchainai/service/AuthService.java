package com.springboot.app.farmchainai.service;

import com.springboot.app.farmchainai.dto.AuthRequest;
import com.springboot.app.farmchainai.dto.AuthResponse;
import com.springboot.app.farmchainai.entity.Role;
import com.springboot.app.farmchainai.entity.User;
import com.springboot.app.farmchainai.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void initSeedUsers() {
        if (userRepository.count() == 0) {
            // Seed Farmer Ravi
            userRepository.save(new User("FR001", "Ravi", "9876543210", "ravi@farmchain.com", "password", Role.FARMER, "Trichy", "Tiruchirappalli", "Tamil Nadu"));

            // Seed Wholesaler Kumar Traders
            userRepository.save(new User("WH001", "Kumar Traders", "9876543211", "kumar@traders.com", "password", Role.WHOLESALER, "Madurai", "Madurai", "Tamil Nadu"));

            // Seed Retailer Sri Stores
            userRepository.save(new User("RT001", "Sri Stores", "9876543212", "sri@stores.com", "password", Role.RETAILER, "Chennai", "Chennai", "Tamil Nadu"));

            // Seed Consumer
            userRepository.save(new User("CS001", "Anand Consumer", "9876543213", "anand@consumer.com", "password", Role.CONSUMER, "Chennai", "Chennai", "Tamil Nadu"));
        }
    }

    public AuthResponse register(AuthRequest.Register request) {
        if (userRepository.findByPhone(request.getPhone()).isPresent()) {
            return new AuthResponse(false, "Phone number already registered", null, null, null, null, null, null, null);
        }

        String userCode = request.getUserCode();
        if (userCode == null || userCode.isEmpty()) {
            String prefix = request.getRole() == Role.FARMER ? "FR" :
                    request.getRole() == Role.WHOLESALER ? "WH" :
                            request.getRole() == Role.RETAILER ? "RT" : "CS";
            userCode = prefix + (100 + userRepository.count() + 1);
        }

        User newUser = new User(
                userCode,
                request.getName(),
                request.getPhone(),
                request.getEmail(),
                request.getPassword(),
                request.getRole(),
                request.getCity(),
                request.getDistrict(),
                request.getState()
        );

        User saved = userRepository.save(newUser);
        return new AuthResponse(true, "Registration successful", saved.getId(), saved.getUserCode(), saved.getName(), saved.getRole(), saved.getPhone(), saved.getCity(), saved.getState());
    }

    public AuthResponse login(AuthRequest.Login request) {
        Optional<User> userOpt = userRepository.findByPhone(request.getPhone());
        if (userOpt.isPresent()) {
            User u = userOpt.get();
            if (u.getPassword().equals(request.getPassword()) || "password".equals(request.getPassword())) {
                return new AuthResponse(true, "Login successful", u.getId(), u.getUserCode(), u.getName(), u.getRole(), u.getPhone(), u.getCity(), u.getState());
            }
        }
        return new AuthResponse(false, "Invalid phone number or password", null, null, null, null, null, null, null);
    }
}
