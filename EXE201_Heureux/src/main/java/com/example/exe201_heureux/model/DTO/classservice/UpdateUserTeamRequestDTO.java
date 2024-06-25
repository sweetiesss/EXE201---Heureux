package com.example.exe201_heureux.model.DTO.classservice;

import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateUserTeamRequestDTO {
    private Integer id;
    private Team team;
    private User user;
}
