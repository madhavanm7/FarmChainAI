package com.springboot.app.farmchainai.repository;

import com.springboot.app.farmchainai.entity.Role;
import com.springboot.app.farmchainai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    Optional<User> findByUserCode(String userCode);
    List<User> findByRole(Role role);
}