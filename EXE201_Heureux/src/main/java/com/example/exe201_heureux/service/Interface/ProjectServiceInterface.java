package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.exceptions.ProjectNotFoundException;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateProjectRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateProjectRequestDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;

public interface ProjectServiceInterface {
    ResponseObject createProject(CreateProjectRequestDTO requestDTO);
    ResponseObject updateProject(UpdateProjectRequestDTO requestDTO);
    APIPageableResponseDTO<ProjectResponseDTO> getAllProjects(int pageNo, int pageSize, String search, String sortField, boolean ascending);
    APIPageableResponseDTO<ProjectResponseDTO> getAllActiveProjects(int pageNo, int pageSize, String search, String sortField, boolean ascending);
    ResponseObject DeleteProject(int projectId);
    ResponseObject ActiveProject(int projectId);
    Project findByID(Integer projectId) throws ProjectNotFoundException;
}
