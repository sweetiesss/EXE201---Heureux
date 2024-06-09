package com.example.exe201_heureux.model.DTO.classservice;

import com.example.exe201_heureux.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateReportRequestDTO {
    private Integer teamId;
    private String description;
    private String status;
}
