package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Integer> {
}
