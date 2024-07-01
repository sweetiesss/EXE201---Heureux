package com.example.exe201_heureux.model.DTO.classservice;

import com.example.exe201_heureux.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateTaskRequestDTO {
    private String name;
    private String description;
    private String assignee;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
    private String priority;
    private String section;
    private Integer teamid;
}
