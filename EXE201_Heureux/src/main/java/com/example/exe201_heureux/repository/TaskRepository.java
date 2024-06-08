package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    Optional<Task> findById (int id);
    Optional<Task> findAllByName (String name);
}
