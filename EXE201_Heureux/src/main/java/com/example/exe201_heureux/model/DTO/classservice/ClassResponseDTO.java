package com.example.exe201_heureux.model.DTO.classservice;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ClassResponseDTO {
    private String className;
    private String createDate;
}
