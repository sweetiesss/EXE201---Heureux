package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.entity.Task;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateTaskRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.TaskResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateTaskRequestDTO;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.ProjectMapper;
import com.example.exe201_heureux.model.mapper.TaskMapper;
import com.example.exe201_heureux.repository.TaskRepository;
import com.example.exe201_heureux.repository.TeamRepository;
import com.example.exe201_heureux.repository.UserRepository;
import com.example.exe201_heureux.service.Interface.TaskServiceInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImp implements TaskServiceInterface {
    private final TaskRepository taskRepository;
    private final TeamRepository teamRepository;


    public TaskServiceImp(TaskRepository taskRepository , TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
        this.taskRepository = taskRepository;
    }
    public ResponseObject createTask(CreateTaskRequestDTO requestDTO) {
        if (requestDTO.getName() == null) {
            return ResponseObject.builder()
                    .message("Task name cannot be null")
                    .statusCode(400)
                    .build();
        }

        if (requestDTO.getStartDate().isAfter(requestDTO.getEndDate())) {
            return ResponseObject.builder()
                    .message("Start date cannot be after end date")
                    .statusCode(400)
                    .build();
        }

        Optional<Team> teamOptional = teamRepository.findById(requestDTO.getTeamid());
        if (!teamOptional.isPresent()) {
            return ResponseObject.builder()
                    .message("Team not found")
                    .statusCode(404)
                    .build();
        }

        Team team = teamOptional.get();

        Task task = Task.builder()
                .name(requestDTO.getName())
                .description(requestDTO.getDescription())
                .assignee(requestDTO.getAssignee())
                .startDate(requestDTO.getStartDate())
                .endDate(requestDTO.getEndDate())
                .status(requestDTO.getStatus())
                .priority(requestDTO.getPriority())
                .teamid(team)
                .build();

        taskRepository.save(task);

        return ResponseObject.builder()
                .message("Task created successfully")
                .statusCode(200)
                .build();
    }
    public ResponseObject updateTask(UpdateTaskRequestDTO requestDTO) {
        Optional<Task> taskOptional = taskRepository.findById(requestDTO.getId());

        if (requestDTO.getStartDate() != null && requestDTO.getEndDate() != null) {
            if (requestDTO.getStartDate().isAfter(requestDTO.getEndDate())) {
                return ResponseObject.builder()
                        .message("Start date cannot be after end date")
                        .statusCode(400)
                        .build();
            }
        }
        Task task = taskOptional.get();

        if (requestDTO.getName() != null) {
            task.setName(requestDTO.getName());
        }

            task.setDescription(requestDTO.getDescription());


            task.setAssignee(requestDTO.getAssignee());


            task.setStartDate(requestDTO.getStartDate());


            task.setEndDate(requestDTO.getEndDate());


            task.setPriority(requestDTO.getPriority());


        String status = requestDTO.getStatus() != null ? requestDTO.getStatus() : task.getStatus();
        task.setStatus(status);


        taskRepository.save(task);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public ResponseObject deleteTask(Integer taskId) {
        Optional<Task> taskOptional = taskRepository.findById(taskId);

        if (!taskOptional.isPresent()) {
            return ResponseObject.builder()
                    .message("Task not found")
                    .statusCode(404)
                    .build();
        }

        taskRepository.deleteById(taskId);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public List<TaskResponseDTO> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();

        List<TaskResponseDTO> taskResponseDTOs = tasks.stream()
                .map(TaskMapper::taskToDTO)
                .collect(Collectors.toList());

        return taskResponseDTOs;
    }
    public List<TaskResponseDTO> getTasksByTeamId(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + teamId));

        List<Task> tasks = taskRepository.findByTeamid(team);

        return tasks.stream()
                .map(TaskMapper::taskToDTO)
                .collect(Collectors.toList());
    }
}