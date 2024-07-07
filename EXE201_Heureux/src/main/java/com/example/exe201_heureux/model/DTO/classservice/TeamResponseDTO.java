package com.example.exe201_heureux.model.DTO.classservice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeamResponseDTO {
    private  int id;
    private String name;
    private boolean flag;
    private Integer project_id;
    private String project_name;
    private int size;
}
