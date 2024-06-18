package com.example.exe201_heureux.model.mapper;

import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.TeamResponseDTO;

import java.time.format.DateTimeFormatter;

public class TeamMapper {
    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String ONGOING_STATUS = "Ongoing";
    public static final String ACTIVE_STATUS = "Active";
    public static final String INACTIVE_STATUS = "InActive";
    private static final String FINISHED_STATUS = "Finished";
    public static TeamResponseDTO teamToDTO(Team c){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);


        return TeamResponseDTO.builder()
                .id(c.getId())
                .name(c.getName())
                .flag(c.getFlag() != null ? c.getFlag() : false)
                .size(c.getSize() != null ? c.getSize() : 0)
                .build();
    }
}
