package com.example.exe201_heureux.controller;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateReportRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ReportResponseDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;
import com.example.exe201_heureux.service.Interface.ProjectServiceInterface;
import com.example.exe201_heureux.service.Interface.ReportServiceInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/report")
@CrossOrigin(origins = {"http://localhost:3000"})
public class ReportController {
    @Autowired
    private ReportServiceInterface reportService;
    @PostMapping
    public ResponseObject createReport(@RequestBody CreateReportRequestDTO requestDTO) {
        return reportService.createReport(requestDTO);
    }
    @GetMapping
    public APIPageableResponseDTO<ReportResponseDTO> getAllReports(@RequestParam(defaultValue = "0") int pageNo,
                                                                   @RequestParam(defaultValue = "10") int pageSize,
                                                                   @RequestParam(defaultValue = "id") String sortField,
                                                                   @RequestParam(defaultValue = "true") boolean ascending) {
        return reportService.getAllReports(pageNo, pageSize, sortField, ascending);
    }
    @GetMapping("/team/{teamId}")
    public APIPageableResponseDTO<ReportResponseDTO> getAllReportsByTeamId(@PathVariable Integer teamId,
                                                                           @RequestParam(defaultValue = "0") int pageNo,
                                                                           @RequestParam(defaultValue = "10") int pageSize,
                                                                           @RequestParam(defaultValue = "id") String sortField,
                                                                           @RequestParam(defaultValue = "true") boolean ascending) {
        return reportService.getAllReportsByTeamId(teamId, pageNo, pageSize, sortField, ascending);
    }
}
