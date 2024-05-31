package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Integer> {
    List<User> findAllByUsername(String username);
}
