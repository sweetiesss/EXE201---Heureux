package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.entity.Event;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.EventRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.EventResponseDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.service.Interface.EventServiceInterface;
import com.example.exe201_heureux.service.Interface.ProjectServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/event")
@CrossOrigin(origins = "*")
public class EventController {
    @Autowired
    private EventServiceInterface eventService;



    @GetMapping("/paged")
    public APIPageableResponseDTO<EventResponseDTO> getAllEventsPaged(
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "",name = "search") String search,
            @RequestParam(defaultValue = "true") boolean ascending) {
        return eventService.getAllEvents(pageNo, pageSize, sortField, search ,ascending);
    }

    @PostMapping("/update/{id}")
    public ResponseObject updateEvent(@PathVariable Integer id, @RequestBody EventRequestDTO requestDTO) {
        return eventService.updateEvent(id,requestDTO);
    }

    @DeleteMapping("/{eventId}")
    public ResponseObject deleteEvent(@PathVariable Integer eventId) {
        return eventService.deleteEvent(eventId);
    }

    @PostMapping("/create")
    public ResponseObject createEvent(@RequestBody EventRequestDTO requestDTO) {
        return eventService.createEvent(requestDTO);
    }
}
