package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.*;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.service.Implement.ProjectServiceImp;
import com.example.exe201_heureux.service.Implement.TeamServiceImp;
import com.example.exe201_heureux.service.Interface.TeamServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/teams")
public class TeamController {
    @Autowired
    private TeamServiceInterface teamService;
    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createTeam(@RequestBody CreateTeamRequestDTO requestDTO) {
        ResponseObject responseDTO = teamService.createTeam(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
    }

    @PostMapping("/update")
    public ResponseEntity<ResponseObject> updateTeam(@RequestBody UpdateTeamRequestDTO requestDTO) {
        ResponseObject responseDTO = teamService.updateTeam(requestDTO);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity<APIPageableResponseDTO<TeamResponseDTO>> getAllTeams(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "name") String sortField,
            @RequestParam(defaultValue = "true") boolean ascending) {

        APIPageableResponseDTO<TeamResponseDTO> responseDTO = teamService.getAllTeams(pageNo, pageSize, search, sortField, ascending);
        return ResponseEntity.ok(responseDTO);
    }
}
