package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateTeamRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.TeamResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateTeamRequestDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;

public interface TeamServiceInterface {
    ResponseObject createTeam (CreateTeamRequestDTO requestDTO);
    ResponseObject updateTeam(UpdateTeamRequestDTO requestDTO);
    APIPageableResponseDTO<TeamResponseDTO> getAllTeams(int pageNo, int pageSize, String search, String sortField, boolean ascending);
}
