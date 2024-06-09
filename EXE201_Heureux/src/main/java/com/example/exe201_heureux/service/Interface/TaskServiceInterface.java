package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateTaskRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.TaskResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateTaskRequestDTO;

import java.util.List;

public interface TaskServiceInterface {
    ResponseObject createTask(CreateTaskRequestDTO requestDTO);
    ResponseObject updateTask(UpdateTaskRequestDTO requestDTO);
    ResponseObject deleteTask(Integer taskId);
    List<TaskResponseDTO> getAllTasks();
    List<TaskResponseDTO> getTasksByTeamId(Integer teamId);
}
