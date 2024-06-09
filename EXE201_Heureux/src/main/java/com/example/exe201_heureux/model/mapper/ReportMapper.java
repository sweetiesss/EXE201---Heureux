package com.example.exe201_heureux.model.mapper;

import com.example.exe201_heureux.entity.Report;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.model.DTO.classservice.ReportResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.TeamResponseDTO;

import java.time.format.DateTimeFormatter;

public class ReportMapper {
    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String ONGOING_STATUS = "Ongoing";
    public static final String ACTIVE_STATUS = "Active";
    public static final String INACTIVE_STATUS = "InActive";
    private static final String FINISHED_STATUS = "Finished";
    public static ReportResponseDTO reportToDTO(Report c){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);


        return ReportResponseDTO.builder()
                .id(c.getId())
                .description(c.getDescription())
                .teamName(c.getTeamid().getName())
                .createDate(c.getCreateDate())
                .build();
    }
}
