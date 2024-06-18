package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.exceptions.ProjectNotFoundException;
import com.example.exe201_heureux.exceptions.TeamNotFoundException;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateTeamRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.TeamResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateTeamRequestDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;

import java.util.List;

public interface TeamServiceInterface {
    ResponseObject createTeam (CreateTeamRequestDTO requestDTO);
    ResponseObject updateTeam(UpdateTeamRequestDTO requestDTO);
    APIPageableResponseDTO<TeamResponseDTO> getAllTeams(int pageNo, int pageSize, String search, String sortField, boolean ascending);
    Team findByID(Integer teamId) throws TeamNotFoundException;
    void addUserToTeam(Integer teamId, List<Integer> userIds) throws TeamNotFoundException, ProjectNotFoundException;
}
