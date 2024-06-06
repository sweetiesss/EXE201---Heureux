package com.example.exe201_heureux.model.DTO.classservice;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateTeamRequestDTO {
    private int id;
    private String name;
}
