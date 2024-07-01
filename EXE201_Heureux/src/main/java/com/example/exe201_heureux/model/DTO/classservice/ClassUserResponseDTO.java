package com.example.exe201_heureux.model.DTO.classservice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClassUserResponseDTO {
    private Integer id ;
    private String class_name;
    private Integer class_id;
    private LocalDate class_createdDate;
    private String user_name;
    private boolean flag;
}
