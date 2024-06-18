package com.example.exe201_heureux.model.DTO.UserTeamDTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserTeamRequestDTO {
    private Integer teamId;
    private List<Integer> userIds;
}
