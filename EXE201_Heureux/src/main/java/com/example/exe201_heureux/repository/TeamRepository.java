package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.entity.UserTeam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Integer> {
    Page<Team> findByNameContaining(Pageable pageable, String search);
    Optional<Team> findTeamById(Integer id);
    List<Team> findByClassid(Class classId);

}
