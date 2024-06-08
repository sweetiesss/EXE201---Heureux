package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.entity.ClassProject;
import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.exceptions.ClassNotFoundException;
import com.example.exe201_heureux.model.DTO.classprojectservice.ClassProjectRequestDTO;
import com.example.exe201_heureux.repository.ClassProjectRepository;
import com.example.exe201_heureux.service.Interface.ClassProjectServiceInterface;
import com.example.exe201_heureux.service.Interface.ClassServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassProjectServiceImp implements ClassProjectServiceInterface{
    ClassServiceInterface classServiceInterface;
    ClassProjectRepository classProjectRepository;

    public List<ClassProject> getAllProjectOfClass(Integer classId) throws ClassNotFoundException {
        Class currentClass = classServiceInterface.findClassById(classId);

        return classProjectRepository.findAllByClassid(currentClass);
    }



    public void addProjectsToClass(ClassProjectRequestDTO classProjectRequestDTO) throws ClassNotFoundException {
        Class currentClass = classServiceInterface.findClassById(classProjectRequestDTO.getClassId());
        List<ClassProject> classProjects = classProjectRequestDTO.getProjectList().stream()
                .map(project -> ClassProject.builder()
                        .classid(currentClass)
                        .projectid(project)
                        .build())
                .collect(Collectors.toList());
        classProjectRepository.saveAll(classProjects);
    }

    public void updateProjectsOfClass(ClassProjectRequestDTO classProjectRequestDTO) throws ClassNotFoundException {
        Class currentClass = classServiceInterface.findClassById(classProjectRequestDTO.getClassId());
        List<ClassProject> existingClassProjects = classProjectRepository.findAllByClassid(currentClass);

        classProjectRepository.deleteAll(existingClassProjects);

        List<ClassProject> newClassProjects = classProjectRequestDTO.getProjectList().stream()
                .map(project -> ClassProject.builder()
                        .classid(currentClass)
                        .projectid(project)
                        .build())
                .collect(Collectors.toList());

        classProjectRepository.saveAll(newClassProjects);
    }
}
