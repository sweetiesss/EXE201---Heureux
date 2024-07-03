package com.example.exe201_heureux.model.DTO.classservice;

import com.example.exe201_heureux.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTeamResponseDTO {
    private String team;
    private String userid;
    private boolean isLeader;
    private Integer id;
    private Integer teamId;
    private Integer classId;
    private Integer projectId;
}
