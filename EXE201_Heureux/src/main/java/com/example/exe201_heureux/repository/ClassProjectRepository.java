package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.entity.ClassProject;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ClassProjectRepository extends JpaRepository<ClassProject, Integer> {

    List<ClassProject> findAllByClassid(Class classId);
}
