package com.example.exe201_heureux.service.Implement;


import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.entity.UserTeam;
import com.example.exe201_heureux.exceptions.ProjectNotFoundException;
import com.example.exe201_heureux.exceptions.TeamNotFoundException;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.*;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.ProjectMapper;
import com.example.exe201_heureux.model.mapper.TeamMapper;
import com.example.exe201_heureux.repository.TeamRepository;

import com.example.exe201_heureux.repository.UserRepository;
import com.example.exe201_heureux.repository.UserTeamRepository;
import com.example.exe201_heureux.service.Interface.ProjectServiceInterface;
import com.example.exe201_heureux.service.Interface.TeamServiceInterface;
import com.example.exe201_heureux.service.Interface.UserTeamInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class TeamServiceImp implements TeamServiceInterface {
    private final UserTeamRepository userTeamRepository;
    private final TeamRepository teamRepository;
    ProjectServiceInterface projectServiceInterface;
    UserTeamInterface userTeamInterface;
    public TeamServiceImp(TeamRepository teamRepository , UserTeamRepository userTeamRepository) {
        this.userTeamRepository = userTeamRepository;
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
                        .size(0)
                        .flag(false)
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

    public Team findByID(Integer teamId) throws TeamNotFoundException {
        Optional<Team> teamOptional = teamRepository.findById(teamId);

        if(teamOptional.isEmpty()) throw new TeamNotFoundException();

        return teamOptional.get();
    }
    public UserTeam findTeamByID(Integer teamId) throws TeamNotFoundException {
        Optional<UserTeam> teamOptional = userTeamRepository.findById(teamId);

        if(teamOptional.isEmpty()) throw new TeamNotFoundException();

        return teamOptional.get();
    }

    public void addProjectToTeam(Integer teamId, Integer projectId) throws TeamNotFoundException, ProjectNotFoundException {
        Team team = findByID(teamId);
        Project project = projectServiceInterface.findByID(projectId);

        team.setProjectid(project);

        teamRepository.save(team);
    }
    public void addUserToTeam(Integer teamId, List<Integer> userIds) throws TeamNotFoundException, ProjectNotFoundException {
        UserTeam team = findTeamByID(teamId);
        for (Integer userId : userIds) {
            User user = userTeamInterface.findByID(userId);
            if (user == null) {
                throw new ProjectNotFoundException();
            }
            team.setUserid(user);
        }

        userTeamRepository.save(team);
    }

}
