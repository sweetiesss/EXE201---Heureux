package com.example.exe201_heureux.model.DTO.classservice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReportResponseDTO {
    private Integer id;
    private String teamName;
    private String description;
    private String status;
    private Instant createDate;
}
