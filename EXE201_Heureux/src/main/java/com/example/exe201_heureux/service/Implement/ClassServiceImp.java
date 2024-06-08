package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.Class;
import com.example.exe201_heureux.entity.User;
import com.example.exe201_heureux.exceptions.ClassNotFoundException;
import com.example.exe201_heureux.exceptions.UserNotFoundException;
import com.example.exe201_heureux.model.DTO.classservice.ClassRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ClassResponseDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.ClassMapper;
import com.example.exe201_heureux.repository.ClassRepository;
import com.example.exe201_heureux.repository.UserRepository;
import com.example.exe201_heureux.service.Interface.ClassServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClassServiceImp implements ClassServiceInterface {
    private final ClassRepository classRepository;
    private final UserRepository userRepository;

    @Override
    public Class findClassById(Integer classId) throws ClassNotFoundException {
        Optional<Class> optionalClass = classRepository.findById(classId);

        if(optionalClass.isEmpty()) throw new ClassNotFoundException();

        return optionalClass.get();
    }


    @Override
    public APIPageableResponseDTO<ClassResponseDTO> getALlUserByDelete(int pageNo, int pageSize, String search, String sortField) {
        Pageable pageable= PageRequest.of(pageNo,pageSize, Sort.by(sortField).ascending());
        Page<Class> page=classRepository.findByNameContaining(pageable,search);
        Page<ClassResponseDTO> userDtoPage = page.map(ClassMapper::classToDTO);

        return new APIPageableResponseDTO<>(userDtoPage);
    }

    @Override
    public Class getClassByName(ClassRequestDTO classRequestDTO) throws ClassNotFoundException {
        Optional<Class> currentClass = classRepository.findByName(classRequestDTO.getClassName());
        if(currentClass.isEmpty()) throw new ClassNotFoundException();

        return currentClass.get();
    }


    @Override
    public void createClass(ClassRequestDTO classRequestDTO) throws UserNotFoundException {

        Optional<User> optionalUser = userRepository.findByEmail(classRequestDTO.getCreateBy());

        if(optionalUser.isEmpty()) throw new UserNotFoundException();

        Class newClass = Class.builder()
                .createBy(classRequestDTO.createBy)
                .name(classRequestDTO.getClassName())
                .createDate(LocalDate.now())
                .build();

        classRepository.save(newClass);
    }

    @Override
    public void updateClass(Integer id, ClassRequestDTO classRequestDTO) throws ClassNotFoundException {
        Optional<Class> currentClass = classRepository.findById(id);
        if(currentClass.isEmpty()) throw new ClassNotFoundException();

        Class classToUpdate = currentClass.get();

        if(classRequestDTO.getClassName() != null) classToUpdate.setName(classRequestDTO.getClassName());

        classRepository.save(classToUpdate);
    }

    @Override
    public void deleteClass(Integer id, ClassRequestDTO classRequestDTO) throws ClassNotFoundException {
        Optional<Class> currentClass = classRepository.findById(id);
        if(currentClass.isEmpty()) throw new ClassNotFoundException();

        Class classToDelete = currentClass.get();

        classRepository.delete(classToDelete);
    }


}