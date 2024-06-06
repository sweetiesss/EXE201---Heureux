package com.example.exe201_heureux.model.DTO.classservice;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectResponseDTO <T> {
    private int id;
    private String projectName;
    private String description;
    private String createBy;
    private String status;
}
