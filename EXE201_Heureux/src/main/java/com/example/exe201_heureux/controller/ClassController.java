package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.exceptions.UserNotFoundException;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.ClassRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ClassResponseDTO;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.service.Implement.ClassServiceImp;
import com.example.exe201_heureux.service.Interface.ClassServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/class")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ClassController {

    private final ClassServiceInterface classServiceInterface;

    final String PAGE = "0";
    final String PAGE_SIZE = "8";

    @GetMapping("/get-all")
    public APIPageableResponseDTO<ClassResponseDTO> getClass(@RequestParam(defaultValue = PAGE, name = "page") Integer pageNo,
                                                            @RequestParam(defaultValue = PAGE_SIZE, name = "size") Integer pageSize,
                                                            @RequestParam(defaultValue = "", name = "search") String search,
                                                            @RequestParam(defaultValue ="name",name="sort") String sort) {
        return classServiceInterface.getALlUserByDelete(pageNo,pageSize,search,sort);
    }

    @GetMapping("/get-by-name")
    public ResponseEntity<ResponseObject> getClassByName(@RequestBody ClassRequestDTO classRequestDTO) throws Exception {
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message(ResponseMessage.msgSuccess)
                        .data(classServiceInterface.getClassByName(classRequestDTO))
                        .build()
        );
    }


    @PostMapping("/create")
    public ResponseEntity<ResponseObject> createClass(@RequestBody ClassRequestDTO classRequestDTO) throws Exception {

        classServiceInterface.createClass(classRequestDTO);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message(ResponseMessage.msgSuccess)
                        .build()
        );

    }

    @PostMapping("/update/{id}")
    public ResponseEntity<ResponseObject> updateClass(@PathVariable Integer id, @RequestBody ClassRequestDTO classRequestDTO) throws Exception {

        classServiceInterface.updateClass(id, classRequestDTO);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message(ResponseMessage.msgSuccess)
                        .build()
        );

    }

    @PostMapping("/delete/{id}")
    public ResponseEntity<ResponseObject> deleteClass(@PathVariable Integer id, @RequestBody ClassRequestDTO classRequestDTO) throws Exception {

        classServiceInterface.deleteClass(id, classRequestDTO);

        return ResponseEntity.ok(
                ResponseObject.builder()
                        .statusCode(HttpStatus.OK.value())
                        .message(ResponseMessage.msgSuccess)
                        .build()
        );

    }
}