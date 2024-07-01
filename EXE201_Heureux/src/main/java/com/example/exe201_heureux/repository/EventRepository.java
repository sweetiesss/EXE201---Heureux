package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    Page<Event> findByTitleContaining(Pageable pageable, String search);
    List<Event> findByTeam(Team teamId);
}
