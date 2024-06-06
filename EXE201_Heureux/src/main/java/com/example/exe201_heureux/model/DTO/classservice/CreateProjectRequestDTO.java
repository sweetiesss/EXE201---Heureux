package com.example.exe201_heureux.model.DTO.classservice;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateProjectRequestDTO {
     private String projectName;
     private String description;
     private String createBy;
}
