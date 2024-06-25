package com.example.exe201_heureux.model.mapper;

import com.example.exe201_heureux.entity.Event;
import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.model.DTO.classservice.EventResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;

import java.time.format.DateTimeFormatter;

public class EventMapper {
    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String ONGOING_STATUS = "Ongoing";
    public static final String ACTIVE_STATUS = "Active";
    public static final String INACTIVE_STATUS = "InActive";
    private static final String FINISHED_STATUS = "Finished";
    public static EventResponseDTO eventToDTO(Event c){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);


        return EventResponseDTO.builder()
                .id(c.getId())
                .title(c.getTitle())
                .team(c.getTeam().getName())
                .status(c.getStatus())
                .createDate(c.getCreateDate())
                .type(c.getType())
                .endDate(c.getEndDate())
                .build();
    }
}
