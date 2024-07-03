package com.example.exe201_heureux.model.mapper;

import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.UserTeam;
import com.example.exe201_heureux.model.DTO.classservice.TeamResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UserTeamResponseDTO;

import java.time.format.DateTimeFormatter;

public class UserTeamMapper {
    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String ONGOING_STATUS = "Ongoing";
    public static final String ACTIVE_STATUS = "Active";
    public static final String INACTIVE_STATUS = "InActive";
    private static final String FINISHED_STATUS = "Finished";

    public static UserTeamResponseDTO teamToDTO(UserTeam c) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);


        return UserTeamResponseDTO.builder()
                .id(c.getId())
                .team(c.getTeamid().getName())
                .userid(c.getUserid().getUsername())
                .isLeader(c.getIsLeader())
                .teamId(c.getTeamid().getId())
                .classId(c.getTeamid().getClassid().getId())
                .projectId(c.getTeamid().getProjectid().getId())
                .build();
    }
}