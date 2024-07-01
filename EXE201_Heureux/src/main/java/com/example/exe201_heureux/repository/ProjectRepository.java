package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.*;
import com.example.exe201_heureux.entity.Class;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Integer> {
    Optional<Project> findById (int id);
    Optional<Project> findAllByName (String name);
    Page<Project> findByNameContaining(Pageable pageable, String search);
    Page<Project> findByNameContainingAndStatus(Pageable pageable, String search,String status);
}
