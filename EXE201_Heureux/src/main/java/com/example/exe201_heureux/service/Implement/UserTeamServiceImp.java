package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.*;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.*;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.UserTeamMapper;
import com.example.exe201_heureux.repository.TeamRepository;
import com.example.exe201_heureux.repository.UserRepository;
import com.example.exe201_heureux.repository.UserTeamRepository;
import com.example.exe201_heureux.service.Interface.ProjectServiceInterface;
import com.example.exe201_heureux.service.Interface.UserTeamInterface;
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
public class UserTeamServiceImp implements UserTeamInterface {
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    private final UserTeamRepository userTeamRepository;
    ProjectServiceInterface projectServiceInterface;
    public UserTeamServiceImp(TeamRepository teamRepository , UserRepository userRepository, UserTeamRepository userTeamRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
        this.userTeamRepository = userTeamRepository;
    }
    public ResponseObject addUserListToTeam(List<Integer> userIds, Integer teamId) {

        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new IllegalArgumentException("\n" + "No team found with id: " + teamId));

        for (Integer userId : userIds) {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("No user found with id: " + userId));

            // Tạo mối quan hệ UserTeam mới
            UserTeam userTeam = new UserTeam();
            userTeam.setUserid(user);
            userTeam.setTeamid(team);
            userTeam.setIsLeader(false);

            userTeamRepository.save(userTeam);
        }
        return ResponseObject.builder()
                .message("Successfully added users to team.")
                .statusCode(200)
                .build();
    }
    public List<UserTeamResponseDTO> getUsersByTeam(Integer teamId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + teamId));

        List<UserTeam> teams = userTeamRepository.findByTeamid(team);

        return teams.stream()
                .map(UserTeamMapper::teamToDTO)
                .collect(Collectors.toList());
    }
    public List<UserTeamResponseDTO> getTeamsByUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + userId));

        List<UserTeam> users = userTeamRepository.findByUserid(user);

        return users.stream()
                .map(UserTeamMapper::teamToDTO)
                .collect(Collectors.toList());
    }
    public APIPageableResponseDTO<UserTeamResponseDTO> getAllUserTeams(int pageNo, int pageSize, String sortField, boolean ascending) {
        Sort.Direction direction = ascending ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, direction, sortField);
        Page<UserTeam> page = userTeamRepository.findAll(pageable);
        Page<UserTeamResponseDTO> userDtoPage = page.map(UserTeamMapper::teamToDTO);
        return new APIPageableResponseDTO<>(userDtoPage);
    }

    public ResponseObject setLeaderForUser(Integer userTeamId) {
        UserTeam userTeam = userTeamRepository.findById(userTeamId)
                .orElse(null);

        if (userTeam == null) {
            return ResponseObject.builder()
                    .message("No UserTeam found with id: " + userTeamId)
                    .statusCode(404)
                    .build();
        }

        Team team = userTeam.getTeamid();

        UserTeam currentLeader = userTeamRepository.findByTeamidAndIsLeaderTrue(team);
        if (currentLeader != null) {
            currentLeader.setIsLeader(false);
            userTeamRepository.save(currentLeader);
        }
        userTeam.setIsLeader(true);
        userTeamRepository.save(userTeam);
        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public ResponseObject updateUserTeam(UpdateUserTeamRequestDTO userTeam) {
        UserTeam existingUserTeam = userTeamRepository.findById(userTeam.getId())
                .orElse(null);

        if (existingUserTeam == null) {
            return ResponseObject.builder()
                    .message("No UserTeam found with id: " + (userTeam.getId()))
                    .statusCode(404)
                    .build();
        }
        existingUserTeam.setUserid(userTeam.getUser());
        existingUserTeam.setTeamid(userTeam.getTeam());
        userTeamRepository.save(existingUserTeam);

       return ResponseObject.builder()
               .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public ResponseObject deleteUserTeam(Integer userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        // Kiểm tra xem người dùng có tồn tại không
        if (!optionalUser.isPresent()) {
            return ResponseObject.builder()
                    .message("User not found with id: " + userId)
                    .statusCode(404)
                    .build();
        }

        User user = optionalUser.get();
        List<UserTeam> userTeams = userTeamRepository.findByUserid(user);

        // Kiểm tra xem danh sách UserTeam có trống không
        if (userTeams == null || userTeams.isEmpty()) {
            return ResponseObject.builder()
                    .message("No UserTeam found for user with id: " + userId)
                    .statusCode(404)
                    .build();
        }

        // Xóa tất cả các UserTeam liên quan đến người dùng này
        userTeamRepository.deleteAll(userTeams);

        return ResponseObject.builder()
                .message("UserTeam(s) deleted successfully")
                .statusCode(200)
                .build();
    }
}
