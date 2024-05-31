package com.example.exe201_heureux.model.mapper;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.model.DTO.classservice.ClassResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class ProjectMapper {
    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String ONGOING_STATUS = "Ongoing";
    public static final String ACTIVE_STATUS = "Active";
    public static final String INACTIVE_STATUS = "InActive";
    private static final String FINISHED_STATUS = "Finished";
    public static ProjectResponseDTO projectToDTO(Project c){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);


        return ProjectResponseDTO.builder()
                .id(c.getId())
                .projectName(c.getName())
                .description(c.getDescription())
                .status(c.getStatus())
                .createBy(c.getCreateBy())
                .build();
    }

}
