package com.example.exe201_heureux.service.Implement;


import com.example.exe201_heureux.entity.Class;
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
import com.example.exe201_heureux.model.mapper.ClassMapper;
import com.example.exe201_heureux.model.mapper.ProjectMapper;
import com.example.exe201_heureux.model.mapper.TeamMapper;
import com.example.exe201_heureux.model.mapper.UserTeamMapper;
import com.example.exe201_heureux.repository.*;

import com.example.exe201_heureux.service.Interface.ProjectServiceInterface;
import com.example.exe201_heureux.service.Interface.TeamServiceInterface;
import com.example.exe201_heureux.service.Interface.UserTeamInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class TeamServiceImp implements TeamServiceInterface {
    private final UserTeamRepository userTeamRepository;
    private final TeamRepository teamRepository;
    private final ClassRepository classRepository;
    private final ProjectRepository projectRepository;
    UserTeamInterface userTeamInterface;
    ProjectMapper projectMapper;
    ClassMapper classMapper;
    public TeamServiceImp(TeamRepository teamRepository , UserTeamRepository userTeamRepository, ClassRepository classRepository, ProjectRepository projectRepository) {
        this.userTeamRepository = userTeamRepository;
        this.teamRepository = teamRepository;
        this.classRepository = classRepository;
        this.projectRepository = projectRepository;
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
        Optional<Team> teamOptional = teamRepository.findTeamById(teamId);

        if(teamOptional.isEmpty()) throw new TeamNotFoundException();

        return teamOptional.get();
    }
    public Team getTeamById(Integer id) {
        return teamRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id: " + id));
    }
    public List<TeamResponseDTO> getTeamByClass(Integer classId) {
        Class aClass = classRepository.findById(classId)
                .orElseThrow(() -> new ResourceNotFoundException("Class not found with id " + classId));

        List<Team> teams = teamRepository.findByClassid(aClass);

        return teams.stream()
                .map(TeamMapper::teamToDTO)
                .collect(Collectors.toList());
    }
    public List<ProjectResponseDTO> getProjectByTeamId(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("No team found with id: " + teamId));
        Project project = team.getProjectid();

        ProjectResponseDTO projectResponseDTO = projectMapper.projectToDTO(project);

        // Trả về danh sách ProjectResponseDTO (mặc dù ở đây chỉ có một dự án)
        return Collections.singletonList(projectResponseDTO);
    }
    public List<ClassResponseDTO> getClassByTeamId(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("No team found with id: " + teamId));
        Class aClass = team.getClassid();

        ClassResponseDTO classResponseDTO = classMapper.classToDTO(aClass);

        // Trả về danh sách ProjectResponseDTO (mặc dù ở đây chỉ có một dự án)
        return Collections.singletonList(classResponseDTO);
    }


    public ResponseObject addProjectToTeam(Integer projectId, Integer teamId) {


            Project project = projectRepository.findById(projectId)
                    .orElseThrow(() -> new IllegalArgumentException("No user found with id: " + projectId));
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("No team found with id: " + teamId));
            // Tạo mối quan hệ UserTeam mới

        team.setProjectid(project);

            teamRepository.save(team);

        return ResponseObject.builder()
                .message("Successfully added users to team.")
                .statusCode(200)
                .build();
    }

}
