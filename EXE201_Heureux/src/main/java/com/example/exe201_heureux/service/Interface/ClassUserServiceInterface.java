package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.ClassUserResponseDTO;

import java.util.List;

public interface ClassUserServiceInterface {
    ResponseObject addUserListToClass(List<Integer> userIds, Integer classId);
    List<ClassUserResponseDTO> getClassByUser(Integer userId);
}
