package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.exceptions.ProjectNotFoundException;

public interface UserTeamInterface {
    User findByID(Integer userId) throws ProjectNotFoundException;
}
