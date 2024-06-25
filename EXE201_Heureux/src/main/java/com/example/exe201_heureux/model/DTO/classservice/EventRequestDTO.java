package com.example.exe201_heureux.model.DTO.classservice;

import com.example.exe201_heureux.entity.Team;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventRequestDTO {
    private String title;
   /* private LocalDateTime createDate;*/
    private LocalDateTime endDate;
    private String type;
    private String status;
    private Integer team;

}
