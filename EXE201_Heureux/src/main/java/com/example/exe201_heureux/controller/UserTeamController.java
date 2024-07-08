package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.entity.UserTeam;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.*;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.service.Interface.TeamServiceInterface;
import com.example.exe201_heureux.service.Interface.UserTeamInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user_team")
//@CrossOrigin(origins = {"http://localhost:3000"})
@CrossOrigin(origins = "*")
public class UserTeamController {
    @Autowired
    private UserTeamInterface userTeamService;
    @Autowired
    private TeamServiceInterface teamService;
    @PostMapping("/{teamId}/addUsers")
    public ResponseEntity<ResponseObject> addUserListToTeam(@PathVariable Integer teamId, @RequestBody List<Integer> userIds) {
        ResponseObject responseDTO = userTeamService.addUserListToTeam(userIds, teamId);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
    @GetMapping("/user/{teamId}")
    public List<UserTeamResponseDTO> getUsersByTeamId(@PathVariable Integer teamId) {
        return userTeamService.getUsersByTeam(teamId);
    }
    @GetMapping("/team/{userId}")
    public List<UserTeamResponseDTO> getTeamsByUserId(@PathVariable Integer userId) {
        return userTeamService.getTeamsByUser(userId);
    }
    @GetMapping
    public ResponseEntity<APIPageableResponseDTO<UserTeamResponseDTO>> getAllTeams(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "true") boolean ascending) {

        APIPageableResponseDTO<UserTeamResponseDTO> responseDTO = userTeamService.getAllUserTeams(pageNo, pageSize, sortField, ascending);
        return ResponseEntity.ok(responseDTO);
    }
    @PostMapping("/setLeader/{userTeamId}")
    public ResponseObject setLeaderForUser(@PathVariable Integer userTeamId) {
        return userTeamService.setLeaderForUser(userTeamId);
    }

    // Endpoint để update một UserTeam
    @PutMapping("/update")
    public ResponseObject updateUserTeam(@RequestBody UpdateUserTeamRequestDTO userTeamRequest) {
        return userTeamService.updateUserTeam(userTeamRequest);
    }
    @DeleteMapping("/delete/{userId}")
    public ResponseObject deleteUserTeam(@PathVariable Integer userId) {
        return userTeamService.deleteUserTeam(userId);
    }
}
