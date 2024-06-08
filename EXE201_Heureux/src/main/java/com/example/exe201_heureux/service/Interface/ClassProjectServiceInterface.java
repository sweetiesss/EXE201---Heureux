package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.entity.ClassProject;
import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.exceptions.ClassNotFoundException;
import com.example.exe201_heureux.model.DTO.classprojectservice.ClassProjectRequestDTO;

import java.util.List;

public interface ClassProjectServiceInterface {
    public List<ClassProject> getAllProjectOfClass(Integer classId) throws ClassNotFoundException;
    public void addProjectsToClass(ClassProjectRequestDTO classProjectRequestDTO) throws ClassNotFoundException;
    void updateProjectsOfClass(ClassProjectRequestDTO classProjectRequestDTO) throws ClassNotFoundException;
}
