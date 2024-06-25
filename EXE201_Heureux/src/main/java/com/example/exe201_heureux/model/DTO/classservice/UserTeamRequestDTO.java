package com.example.exe201_heureux.model.DTO.classservice;

import com.example.exe201_heureux.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTeamRequestDTO {
    private Integer teamId;
}
