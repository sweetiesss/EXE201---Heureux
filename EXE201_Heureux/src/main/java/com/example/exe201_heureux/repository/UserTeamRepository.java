package com.example.exe201_heureux.repository;

import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.entity.UserTeam;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserTeamRepository extends JpaRepository<UserTeam, Integer> {
    List<UserTeam> findByTeamid(Team teamId);
    List<UserTeam> findByUserid(User userId);
    Page<UserTeam> findAll(Pageable pageable);
    UserTeam findByTeamidAndIsLeaderTrue(Team team);
}
