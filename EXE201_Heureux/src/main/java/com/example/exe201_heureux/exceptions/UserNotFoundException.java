package com.example.exe201_heureux.exceptions;

import com.example.exe201_heureux.model.DTO.message.ResponseMessage;

public class UserNotFoundException extends Exception {
    @Override
    public String getMessage() {
        return ResponseMessage.msgUserDoesNotExist;
    }

}
