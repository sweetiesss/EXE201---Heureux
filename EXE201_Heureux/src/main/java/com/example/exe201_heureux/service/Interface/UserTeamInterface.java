package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.entity.UserTeam;
import com.example.exe201_heureux.exceptions.ProjectNotFoundException;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.UpdateUserTeamRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.UserTeamRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.UserTeamResponseDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;

import java.util.List;

public interface UserTeamInterface {
    ResponseObject addUserListToTeam(List<Integer> userIds, Integer teamId);
    List<UserTeamResponseDTO> getUsersByTeam(Integer teamId);
    APIPageableResponseDTO<UserTeamResponseDTO> getAllUserTeams(int pageNo, int pageSize, String sortField, boolean ascending);
    ResponseObject setLeaderForUser(Integer userTeamId);
    ResponseObject updateUserTeam(UpdateUserTeamRequestDTO userTeam);
    ResponseObject deleteUserTeam(Integer userTeamId);

}
