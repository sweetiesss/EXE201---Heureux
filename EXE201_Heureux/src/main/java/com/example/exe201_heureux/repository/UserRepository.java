package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findAllByUsername(String username);
    Optional<User> findByEmail(String email);
}
