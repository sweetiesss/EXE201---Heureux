package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.entity.Event;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.EventRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.EventResponseDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;

import java.util.List;

public interface EventServiceInterface {
    ResponseObject createEvent(EventRequestDTO requestDTO);
    ResponseObject updateEvent(Integer id, EventRequestDTO requestDTO);
    ResponseObject deleteEvent(Integer eventId);
    APIPageableResponseDTO<EventResponseDTO> getAllEvents(int pageNo, int pageSize, String sortField, String search, boolean ascending);
    List<EventResponseDTO> getEventByTeamId(Integer teamId);
}
