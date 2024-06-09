package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Report;
import com.example.exe201_heureux.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Integer> {
    Page<Report> findByTeamid(Team teamId, Pageable pageable);
}
