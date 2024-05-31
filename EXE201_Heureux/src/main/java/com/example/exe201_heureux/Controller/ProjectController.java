package com.example.exe201_heureux.Controller;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateProjectRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateProjectRequestDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.service.Implement.ProjectServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectServiceImp projectService;

    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createProject(@RequestBody CreateProjectRequestDTO requestDTO) {
        ResponseObject responseDTO = projectService.createProject(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<ResponseObject> updateProject(@RequestBody UpdateProjectRequestDTO requestDTO) {
        ResponseObject responseDTO = projectService.updateProject(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    @PostMapping("/delete/{projectId}")
    public ResponseEntity<ResponseObject> deleteProject(@PathVariable int projectId) {
        ResponseObject responseDTO = projectService.DeleteProject(projectId);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    @PostMapping("/active/{projectId}")
    public ResponseEntity<ResponseObject> activeProject(@PathVariable int projectId) {
        ResponseObject responseDTO = projectService.ActiveProject(projectId);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<APIPageableResponseDTO<ProjectResponseDTO>> getAllProjects(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "true") boolean ascending) {

        APIPageableResponseDTO<ProjectResponseDTO> responseDTO = projectService.getAllProjects(pageNo, pageSize, search, sortField, ascending);
        return ResponseEntity.ok(responseDTO);
    }
    @GetMapping("/active_projects")
    public ResponseEntity<APIPageableResponseDTO<ProjectResponseDTO>> getAllActiveProjects(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "true") boolean ascending) {

        APIPageableResponseDTO<ProjectResponseDTO> responseDTO = projectService.getAllActiveProjects(pageNo, pageSize, search, sortField, ascending);
        return ResponseEntity.ok(responseDTO);
    }
}