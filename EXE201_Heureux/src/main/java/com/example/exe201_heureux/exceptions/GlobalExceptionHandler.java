package com.example.exe201_heureux.exceptions;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Log4j2
public class GlobalExceptionHandler {
    @ExceptionHandler(InvalidateException.class)
    public ResponseEntity<?> handleInvalidateExceptionException(InvalidateException ex) {
        String errorMessage = ex.getMessage();

        ResponseObject responseObject = ResponseObject.builder()
                .statusCode(HttpStatus.PRECONDITION_FAILED.value())
                .message(errorMessage)
                .build();

        return new ResponseEntity<>(responseObject, HttpStatus.PRECONDITION_FAILED);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<?> handleUserNotFoundException(UserNotFoundException ex) {
        String errorMessage = ex.getMessage();

        ResponseObject responseObject = ResponseObject.builder()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .message(errorMessage)
                .build();

        return new ResponseEntity<>(responseObject, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ClassNotFoundException.class)
    public ResponseEntity<?> handleClassNotFoundException(ClassNotFoundException ex) {
        String errorMessage = ex.getMessage();

        ResponseObject responseObject = ResponseObject.builder()
                .statusCode(HttpStatus.NOT_FOUND.value())
                .message(errorMessage)
                .build();

        return new ResponseEntity<>(responseObject, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception ex) {
        String errorMessage = ex.getMessage();

        ResponseObject responseObject = ResponseObject.builder()
                .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message(errorMessage)
                .build();

        return new ResponseEntity<>(responseObject, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
