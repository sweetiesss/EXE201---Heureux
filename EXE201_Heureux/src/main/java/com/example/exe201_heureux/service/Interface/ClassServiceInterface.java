package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.exceptions.ClassNotFoundException;
import com.example.exe201_heureux.exceptions.UserNotFoundException;
import com.example.exe201_heureux.model.DTO.classservice.ClassRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ClassResponseDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;

public interface ClassServiceInterface {
    Class findClassById(Integer classId) throws ClassNotFoundException;
    APIPageableResponseDTO<ClassResponseDTO> getALlUserByDelete(int pageNo, int pageSize, String search, String sortField);
    Class getClassByName(ClassRequestDTO classRequestDTO) throws ClassNotFoundException;
    void createClass(ClassRequestDTO classRequestDTO) throws UserNotFoundException;
    void updateClass(Integer id, ClassRequestDTO classRequestDTO) throws ClassNotFoundException;
    void deleteClass(Integer id, ClassRequestDTO classRequestDTO) throws ClassNotFoundException;
}
