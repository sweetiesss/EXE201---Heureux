package com.example.exe201_heureux.model.DTO.classservice;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectResponseDTO {
    private int id;
    private String projectName;
    private String description;
    private String createBy;
    private String status;
}
