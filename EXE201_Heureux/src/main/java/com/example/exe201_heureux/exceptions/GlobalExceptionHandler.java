package com.example.exe201_heureux.exceptions;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Log4j2
public class GlobalExceptionHandler {
    @ExceptionHandler(InvalidateException.class)
    public ResponseEntity<?> handleTokenExpiredException(InvalidateException ex) {
        String errorMessage = ex.getMessage();

//        logger.error(errorMessage);

        ResponseObject responseObject = ResponseObject.builder()
                .statusCode(HttpStatus.PRECONDITION_FAILED.value())
                .message(errorMessage)
                .build();

        return new ResponseEntity<>(responseObject, HttpStatus.PRECONDITION_FAILED);
    }

}
