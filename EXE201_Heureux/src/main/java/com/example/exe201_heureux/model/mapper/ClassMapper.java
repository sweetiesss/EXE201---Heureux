package com.example.exe201_heureux.model.mapper;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.model.DTO.classservice.ClassResponseDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class ClassMapper {


    private static final String DATE_PATTERN = "yyyy-MM-dd";
    private static final String ONGOING_STATUS = "Ongoing";
    private static final String FINISHED_STATUS = "Finished";
    public static ClassResponseDTO classToDTO(Class c){

        LocalDate localDate = c.getCreateDate();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(DATE_PATTERN);
        String formattedString = localDate.format(formatter);


        return ClassResponseDTO.builder()
                .className(c.getName())
//                .status(c.getStatus() ? ONGOING_STATUS : FINISHED_STATUS) them status
                .createDate(formattedString)
                .build();
    }

}
