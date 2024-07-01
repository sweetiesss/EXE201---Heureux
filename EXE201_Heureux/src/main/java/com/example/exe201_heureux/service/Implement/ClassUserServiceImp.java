package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.entity.ClassUser;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.entity.UserTeam;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.ClassUserResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UserTeamResponseDTO;
import com.example.exe201_heureux.model.mapper.ClassUseraMapper;
import com.example.exe201_heureux.model.mapper.UserTeamMapper;
import com.example.exe201_heureux.repository.*;
import com.example.exe201_heureux.service.Interface.ClassUserServiceInterface;
import com.example.exe201_heureux.service.Interface.ProjectServiceInterface;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClassUserServiceImp implements ClassUserServiceInterface {
    private final UserRepository userRepository;
    private final ClassUserRepository classUserRepository;
    private final ClassRepository classRepository;

    public ClassUserServiceImp(UserRepository userRepository, ClassUserRepository classUserRepository,ClassRepository classRepository) {
        this.userRepository = userRepository;
        this.classUserRepository = classUserRepository;
        this.classRepository = classRepository;
    }
    public ResponseObject addUserListToClass(List<Integer> userIds, Integer classId) {

        Class aclass = classRepository.findById(classId)
                .orElseThrow(() -> new IllegalArgumentException("\n" + "No class found with id: " + classId));

        for (Integer userId : userIds) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("No user found with id: " + userId));

            // Tạo mối quan hệ UserTeam mới
            ClassUser classUser = new ClassUser();
            classUser.setClassid(aclass);
            classUser.setUserid(user);
            classUser.setFlag(false);

            classUserRepository.save(classUser);
        }
        return ResponseObject.builder()
                .message("Successfully added users to team.")
                .statusCode(200)
                .build();
    }
    public List<ClassUserResponseDTO> getClassByUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + userId));

        List<ClassUser> users = classUserRepository.findByUserid(user);

        return users.stream()
                .map(ClassUseraMapper::classToDTO)
                .collect(Collectors.toList());
    }
}
