package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Page<Team> findByNameContaining(Pageable pageable, String search);
}
