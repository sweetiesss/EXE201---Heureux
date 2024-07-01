package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.ClassUser;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.entity.UserTeam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassUserRepository extends JpaRepository<ClassUser, Integer> {
    List<ClassUser> findByUserid(User userId);
    Page<ClassUser> findAll(Pageable pageable);
}
