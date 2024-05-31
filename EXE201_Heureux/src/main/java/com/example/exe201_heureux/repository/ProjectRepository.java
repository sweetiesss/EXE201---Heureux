package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Optional<Project> findById (int id);
    Page<Project> findByNameContaining(Pageable pageable, String search);
    Page<Project> findByNameContainingAndStatus(Pageable pageable, String search,String status);
}
