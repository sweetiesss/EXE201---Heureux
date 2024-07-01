package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.ClassUserResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UserTeamResponseDTO;
import com.example.exe201_heureux.service.Interface.ClassUserServiceInterface;
import com.example.exe201_heureux.service.Interface.UserTeamInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/class-user")
@CrossOrigin(origins = "*")
public class ClassUserController {
    @Autowired
    private ClassUserServiceInterface classUserService;

    @GetMapping("/team/{userId}")
    public List<ClassUserResponseDTO> getClassByUserId(@PathVariable Integer userId) {
        return classUserService.getClassByUser(userId);
    }
    @PostMapping("/{classId}/addUsers")
    public ResponseEntity<ResponseObject> addUserListToClass(@PathVariable Integer classId, @RequestBody List<Integer> userIds) {
        ResponseObject responseDTO = classUserService.addUserListToClass(userIds, classId);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
}
