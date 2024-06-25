package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.ClassUser;
import com.example.exe201_heureux.entity.Event;
import com.example.exe201_heureux.entity.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
    Page<Event> findByTitleContaining(Pageable pageable, String search);
}
