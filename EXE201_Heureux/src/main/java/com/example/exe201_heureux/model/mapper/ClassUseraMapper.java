package com.example.exe201_heureux.model.mapper;

import com.example.exe201_heureux.entity.ClassUser;
import com.example.exe201_heureux.entity.UserTeam;
import com.example.exe201_heureux.model.DTO.classservice.ClassUserResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UserTeamResponseDTO;

import java.time.format.DateTimeFormatter;

public class ClassUseraMapper {
    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String ONGOING_STATUS = "Ongoing";
    public static final String ACTIVE_STATUS = "Active";
    public static final String INACTIVE_STATUS = "InActive";
    private static final String FINISHED_STATUS = "Finished";

    public static ClassUserResponseDTO classToDTO(ClassUser c) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);


        return ClassUserResponseDTO.builder()
                .id(c.getId())
                .class_id(c.getClassid().getId())
                .class_name(c.getClassid().getName())
                .class_createdDate(c.getClassid().getCreateDate())
                .user_name(c.getUserid().getUsername())
                .flag(c.getFlag())
                .build();
    }
}
