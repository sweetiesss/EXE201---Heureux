package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Class;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassRepository extends JpaRepository<Class, Integer> {
    Page<Class> findByNameContaining(Pageable pageable, String search);
}
