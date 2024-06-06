package com.example.exe201_heureux.service.Implement;


import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.*;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.ProjectMapper;
import com.example.exe201_heureux.model.mapper.TeamMapper;
import com.example.exe201_heureux.repository.TeamRepository;

import com.example.exe201_heureux.repository.UserRepository;
import com.example.exe201_heureux.service.Interface.TeamServiceInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeamServiceImp implements TeamServiceInterface {
    private final UserRepository userRepo;
    private final TeamRepository teamRepository;
    public TeamServiceImp(TeamRepository teamRepository , UserRepository userRepo) {
        this.userRepo = userRepo;
        this.teamRepository = teamRepository;
    }
    public ResponseObject createTeam (CreateTeamRequestDTO requestDTO) {
        if (requestDTO.getName() == null) {

            return ResponseObject.builder()
                    .message("Team name cannot be null")
                    .statusCode(400)
                    .build();
        }

        Team team = teamRepository.save(
                Team.builder()
                        .name(requestDTO.getName())
                        .build()
        );
        teamRepository.save(team);


        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public ResponseObject updateTeam(UpdateTeamRequestDTO requestDTO) {
        Optional<Team> teamOptional = teamRepository.findById(requestDTO.getId());
        if (teamOptional.isEmpty()) {
            return ResponseObject.builder()
                    .message("Team does not exist")
                    .statusCode(404)
                    .build();
        }

        Team team = teamOptional.get();

        if (requestDTO.getName() != null) {
            team.setName(requestDTO.getName());
        }

        teamRepository.save(team);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public APIPageableResponseDTO<TeamResponseDTO> getAllTeams(int pageNo, int pageSize, String search, String sortField, boolean ascending) {
        Sort.Direction direction = ascending ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, direction, sortField);
        Page<Team> page = teamRepository.findByNameContaining(pageable, search);
        Page<TeamResponseDTO> userDtoPage = page.map(TeamMapper::teamToDTO);
        return new APIPageableResponseDTO<>(userDtoPage);
    }
}
