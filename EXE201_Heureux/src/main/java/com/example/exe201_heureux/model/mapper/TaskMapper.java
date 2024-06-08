package com.example.exe201_heureux.model.mapper;

import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.entity.Task;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.TaskResponseDTO;

import java.time.format.DateTimeFormatter;

public class TaskMapper {
    public static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String ONGOING_STATUS = "Ongoing";
    public static final String ACTIVE_STATUS = "Active";
    public static final String INACTIVE_STATUS = "InActive";
    private static final String FINISHED_STATUS = "Finished";

    public static TaskResponseDTO taskToDTO(Task c) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);

        return TaskResponseDTO.builder()
                .id(c.getId())
                .name(c.getName())
                .description(c.getDescription())
                .status(c.getStatus())
                .startDate(c.getStartDate())
                .endDate(c.getEndDate())
                .priority(c.getPriority())
                .assignee(c.getAssignee())
                .build();

    }
}