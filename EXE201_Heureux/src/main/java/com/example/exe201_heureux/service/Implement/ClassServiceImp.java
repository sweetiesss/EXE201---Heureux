package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.model.DTO.classservice.ClassRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ClassResponseDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.ClassMapper;
import com.example.exe201_heureux.repository.ClassRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ClassServiceImp {
    private final ClassRepository classRepository;

    public ClassServiceImp(ClassRepository classRepository) {
        this.classRepository = classRepository;
    }

    //    @Override
    public APIPageableResponseDTO<ClassResponseDTO> getALlUserByDelete(int pageNo, int pageSize, String search, String sortField, Boolean delete) {
        Pageable pageable= PageRequest.of(pageNo,pageSize, Sort.by(sortField).ascending());
        Page<Class> page=classRepository.findByNameContaining(pageable,search);
        Page<ClassResponseDTO> userDtoPage = page.map(ClassMapper::classToDTO);

        return new APIPageableResponseDTO<>(userDtoPage);
    }

    public void createClass(ClassRequestDTO classRequestDTO) {
        Class newClass = Class.builder
    }

}
