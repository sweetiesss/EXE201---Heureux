package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.entity.UserTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserTeamRepository extends JpaRepository<UserTeam, Integer> {
}
