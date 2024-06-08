package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classprojectservice.ClassProjectRequestDTO;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.service.Interface.ClassProjectServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/class-project")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ClassProjectController {

    ClassProjectServiceInterface classProjectServiceInterface;


    @GetMapping("/get-project-by-class-id/{id}")
    public ResponseEntity<ResponseObject> getProjectByClass(@PathVariable Integer id) throws Exception {

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message(ResponseMessage.msgSuccess)
                        .data(classProjectServiceInterface.getAllProjectOfClass(id))
                        .build()
        );
    }

    @PostMapping("/add-project-to-class")
    public ResponseEntity<ResponseObject> addProjectToClass(@RequestBody ClassProjectRequestDTO classProjectRequestDTO) throws Exception {

        classProjectServiceInterface.addProjectsToClass(classProjectRequestDTO);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message(ResponseMessage.msgSuccess)
                        .build()
        );
    }

    @PostMapping("/update-project-of-class")
    public ResponseEntity<ResponseObject> updateProjectOfClass(@RequestBody ClassProjectRequestDTO classProjectRequestDTO) throws Exception {

        classProjectServiceInterface.updateProjectsOfClass(classProjectRequestDTO);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message(ResponseMessage.msgSuccess)
                        .build()
        );
    }
}
