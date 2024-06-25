package com.example.exe201_heureux.service.Implement;

import com.example.exe201_heureux.entity.*;
import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.*;
import com.example.exe201_heureux.model.DTO.message.ResponseMessage;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.model.mapper.ProjectMapper;
import com.example.exe201_heureux.model.mapper.ReportMapper;
import com.example.exe201_heureux.repository.*;
import com.example.exe201_heureux.service.Interface.ReportServiceInterface;
import org.hibernate.sql.Update;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class ReportServiceImp implements ReportServiceInterface {
    private final ReportRepository reportRepository;
    private final TeamRepository teamRepository;
    public ReportServiceImp(ReportRepository reportRepository , TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
        this.reportRepository = reportRepository;
    }
    public ResponseObject createReport(CreateReportRequestDTO requestDTO) {
        Optional<Team> teamOptional = teamRepository.findById(requestDTO.getTeamId());
        if (!teamOptional.isPresent()) {
            return ResponseObject.builder()
                    .message("Team not found")
                    .statusCode(404)
                    .build();
        }
        Team team = teamOptional.get();
        Report report = Report.builder()
                .teamid(team)
                .createDate(Instant.now())
                .submittionId(requestDTO.getSubmittionId())
                .title(requestDTO.getTitle())
                .description(requestDTO.getDescription())
                .status(requestDTO.getStatus())
                .build();

        reportRepository.save(report);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public ResponseObject updateReport(Integer id, UpdateReportRequestDTO requestDTO) {
        Optional<Report> reportOptional = reportRepository.findById(id);
        if (!reportOptional.isPresent()) {
            return ResponseObject.builder()
                    .message("Event not found")
                    .statusCode(404)
                    .build();
        }

        Report report = reportOptional.get();
        report.setTitle(requestDTO.getTitle());
        report.setStatus(requestDTO.getStatus());
        report.setDescription(requestDTO.getDescription());
        report.setSubmittionId(requestDTO.getSubmittionId());
        reportRepository.save(report);

        return ResponseObject.builder()
                .message(ResponseMessage.msgSuccess)
                .statusCode(200)
                .build();
    }
    public APIPageableResponseDTO<ReportResponseDTO> getAllReports(int pageNo, int pageSize, String sortField, boolean ascending) {
        Sort.Direction direction = ascending ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, direction, sortField);
        Page<Report> page = reportRepository.findAll(pageable);
        Page<ReportResponseDTO> reportDtoPage = page.map(ReportMapper::reportToDTO);
        return new APIPageableResponseDTO<>(reportDtoPage);
    }
    public APIPageableResponseDTO<ReportResponseDTO> getAllReportsByTeamId(Integer teamId,int pageNo, int pageSize, String sortField, boolean ascending) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new ResourceNotFoundException("Team not found with id " + teamId));

        Sort.Direction direction = ascending ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(pageNo, pageSize, direction, sortField);
        Page<Report> page = reportRepository.findByTeamid(team,pageable);
        Page<ReportResponseDTO> reportDtoPage = page.map(ReportMapper::reportToDTO);
        return new APIPageableResponseDTO<>(reportDtoPage);
    }

}
