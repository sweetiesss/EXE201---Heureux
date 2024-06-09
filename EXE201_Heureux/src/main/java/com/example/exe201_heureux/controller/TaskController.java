package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateTaskRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.TaskResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateTaskRequestDTO;
import com.example.exe201_heureux.service.Interface.TaskServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/task")
@CrossOrigin(origins = {"http://localhost:3000"})
public class TaskController {
    @Autowired
    private TaskServiceInterface taskService;

    @PostMapping
    public ResponseEntity<ResponseObject> createTask(@RequestBody CreateTaskRequestDTO requestDTO) {
        ResponseObject response = taskService.createTask(requestDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping
    public ResponseEntity<ResponseObject> updateTask(@RequestBody UpdateTaskRequestDTO requestDTO) {
        requestDTO.setId(requestDTO.getId());
        ResponseObject response = taskService.updateTask(requestDTO);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseObject> deleteTask(@PathVariable Integer id) {
        ResponseObject response = taskService.deleteTask(id);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDTO>> getAllTasks() {
        List<TaskResponseDTO> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }
    @GetMapping("/team/{teamId}")
    public List<TaskResponseDTO> getTasksByTeamId(@PathVariable Integer teamId) {
        return taskService.getTasksByTeamId(teamId);
    }
}

