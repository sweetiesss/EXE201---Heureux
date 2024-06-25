package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.Event;
import com.example.exe201_heureux.entity.Report;
import com.example.exe201_heureux.entity.Team;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateReportRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.EventRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.EventResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.EventMapper;
import com.example.exe201_heureux.model.mapper.ProjectMapper;
import com.example.exe201_heureux.repository.EventRepository;
import com.example.exe201_heureux.repository.ReportRepository;
import com.example.exe201_heureux.repository.TeamRepository;
import com.example.exe201_heureux.service.Interface.EventServiceInterface;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImp implements EventServiceInterface {
    private final EventRepository eventRepository;
    private final TeamRepository teamRepository;

    public EventServiceImp(EventRepository eventRepository ,TeamRepository teamRepository) {
        this.eventRepository = eventRepository;
        this.teamRepository = teamRepository;
    }
        public ResponseObject createEvent(EventRequestDTO requestDTO) {
            Optional<Team> teamOptional = teamRepository.findById(requestDTO.getTeam());
            if (!teamOptional.isPresent()) {
                return ResponseObject.builder()
                        .message("Team not found")
                        .statusCode(404)
                        .build();
            }
            Team team = teamOptional.get();
            Event event = Event.builder()
                    .team(team)
                    .title(requestDTO.getTitle())
                    .endDate(requestDTO.getEndDate())
                    .type(requestDTO.getType())
                    .status(requestDTO.getStatus())
                    .build();

            eventRepository.save(event);

            return ResponseObject.builder()
                    .message(ResponseMessage.msgSuccess)
                    .statusCode(200)
                    .build();
        }
    public APIPageableResponseDTO<EventResponseDTO> getAllEvents(int pageNo, int pageSize, String sortField,String search, boolean ascending) {
        Sort.Direction direction = ascending ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, direction, sortField);
        Page<Event> page = eventRepository.findByTitleContaining(pageable, search);
        Page<EventResponseDTO> userDtoPage = page.map(EventMapper::eventToDTO);
        return new APIPageableResponseDTO<>(userDtoPage);
    }
    public ResponseObject updateEvent(Integer id, EventRequestDTO requestDTO) {
        Optional<Event> eventOptional = eventRepository.findById(id);
        if (!eventOptional.isPresent()) {
            return ResponseObject.builder()
                    .message("Event not found")
                    .statusCode(404)
                    .build();
        }

        Event event = eventOptional.get();
        event.setTitle(requestDTO.getTitle());
        event.setEndDate(requestDTO.getEndDate());
        event.setType(requestDTO.getType());
        event.setStatus(requestDTO.getStatus());
        eventRepository.save(event);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public ResponseObject deleteEvent(Integer eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (!eventOptional.isPresent()) {
            return ResponseObject.builder()
                    .message("Event not found")
                    .statusCode(404)
                    .build();
        }

        Event event = eventOptional.get();
        eventRepository.delete(event);

        return ResponseObject.builder()
                .message("Event deleted successfully")
                .statusCode(200)
                .build();
    }

}
