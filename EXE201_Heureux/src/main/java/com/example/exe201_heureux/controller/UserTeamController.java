package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.exceptions.ProjectNotFoundException;
import com.example.exe201_heureux.exceptions.TeamNotFoundException;
import com.example.exe201_heureux.model.DTO.UserTeamDTO.UserTeamRequestDTO;
import com.example.exe201_heureux.service.Interface.TeamServiceInterface;
import com.example.exe201_heureux.service.Interface.UserTeamInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user_team")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserTeamController {

    @Autowired
    private UserTeamInterface userTeamService;
    @Autowired
    private TeamServiceInterface teamServiceInterface;
//    @PostMapping("/add-user")
//    public ResponseEntity<String> addUserToTeam(@RequestBody UserTeamRequestDTO request) {
//        try {
//            teamServiceInterface.addUserToTeam(request.getTeamId(), request.getUserIds());
//            return new ResponseEntity<>("User added to team successfully", HttpStatus.OK);
//        } catch (TeamNotFoundException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//        } catch (ProjectNotFoundException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
//        } catch (Exception e) {
//            return new ResponseEntity<>("An error occurred while adding the user to the team", HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
}
