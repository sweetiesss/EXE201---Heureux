package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.Project;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.exceptions.ProjectNotFoundException;
import com.example.exe201_heureux.repository.TeamRepository;
import com.example.exe201_heureux.repository.UserRepository;
import com.example.exe201_heureux.service.Interface.ProjectServiceInterface;
import com.example.exe201_heureux.service.Interface.UserTeamInterface;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserTeamServiceImp implements UserTeamInterface {
    private final UserRepository userRepository;
    private final TeamRepository teamRepository;
    ProjectServiceInterface projectServiceInterface;
    public UserTeamServiceImp(TeamRepository teamRepository , UserRepository userRepository) {
        this.userRepository = userRepository;
        this.teamRepository = teamRepository;
    }
    public User findByID(Integer userId) throws ProjectNotFoundException {
        Optional<User> userOptional = userRepository.findById(userId);

        if(userOptional.isEmpty()) throw new ProjectNotFoundException();

        return userOptional.get();
    }
}
