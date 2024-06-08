package com.example.exe201_heureux.model.DTO.classprojectservice;

import com.example.exe201_heureux.entity.Project;
import lombok.Data;

import java.util.List;

@Data
public class ClassProjectRequestDTO {
    Integer classId;
    List<Project> projectList;
}
