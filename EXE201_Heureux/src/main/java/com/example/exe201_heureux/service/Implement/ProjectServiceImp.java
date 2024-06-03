package com.example.exe201_heureux.service.Implement;


import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateProjectRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateProjectRequestDTO;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.ProjectMapper;
import com.example.exe201_heureux.repository.ProjectRepository;
import com.example.exe201_heureux.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service

public class ProjectServiceImp {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectServiceImp(ProjectRepository projectRepository , UserRepository userRepository) {
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
    }
    public ResponseObject createProject(CreateProjectRequestDTO requestDTO) {

        if (requestDTO.getProjectName() == null) {
            return ResponseObject.builder()
                    .message("Project name cannot be null")
                    .statusCode(400)
                    .build();
        }

        if (userRepository.findAllByUsername(requestDTO.getCreateBy()).isEmpty()) {
            return ResponseObject.builder()
                    .message("User does not exist")
                    .statusCode(400)
                    .build();
        }
        Project project = projectRepository.save(
                Project.builder()
                        .createBy(requestDTO.getCreateBy())
                        .description(requestDTO.getDescription())
                        .name(requestDTO.getProjectName())
                        .status(ProjectMapper.ACTIVE_STATUS)
                        .build()
        );
        projectRepository.save(project);


        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public ResponseObject updateProject(UpdateProjectRequestDTO requestDTO) {
        Optional<Project> projectOptional = projectRepository.findById(requestDTO.getId());
        if (projectOptional.isEmpty()) {
            return ResponseObject.builder()
                    .message("Project does not exist")
                    .statusCode(404)
                    .build();
        }

        Project project = projectOptional.get();

        if (requestDTO.getProjectName() != null) {
            project.setName(requestDTO.getProjectName());
        }
        if (requestDTO.getDescription() != null) {
            project.setDescription(requestDTO.getDescription());
        }

        String status = requestDTO.getStatus() != null ? requestDTO.getStatus() : project.getStatus();
        project.setStatus(status);


        projectRepository.save(project);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public APIPageableResponseDTO<ProjectResponseDTO> getAllProjects(int pageNo, int pageSize, String search, String sortField, boolean ascending) {
        Sort.Direction direction = ascending ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, direction, sortField);
        Page<Project> page = projectRepository.findByNameContaining(pageable, search);
        Page<ProjectResponseDTO> userDtoPage = page.map(ProjectMapper::projectToDTO);
        return new APIPageableResponseDTO<>(userDtoPage);
    }
    public APIPageableResponseDTO<ProjectResponseDTO> getAllActiveProjects(int pageNo, int pageSize, String search, String sortField, boolean ascending) {
        Sort.Direction direction = ascending ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, direction, sortField);
        Page<Project> page = projectRepository.findByNameContainingAndStatus(pageable, search, ProjectMapper.ACTIVE_STATUS);
        Page<ProjectResponseDTO> userDtoPage = page.map(ProjectMapper::projectToDTO);
        return new APIPageableResponseDTO<>(userDtoPage);
    }
    public ResponseObject DeleteProject(int projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isEmpty()) {
            return ResponseObject.builder()
                    .message("Project does not exist")
                    .statusCode(404)
                    .build();
        }

        Project project = projectOptional.get();

        project.setStatus(ProjectMapper.INACTIVE_STATUS);


        projectRepository.save(project);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public ResponseObject ActiveProject(int projectId) {
        Optional<Project> projectOptional = projectRepository.findById(projectId);
        if (projectOptional.isEmpty()) {
            return ResponseObject.builder()
                    .message("Project does not exist")
                    .statusCode(404)
                    .build();
        }

        Project project = projectOptional.get();

        project.setStatus(ProjectMapper.ACTIVE_STATUS);


        projectRepository.save(project);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
}
