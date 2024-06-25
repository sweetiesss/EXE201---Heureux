package com.example.exe201_heureux.service.Interface;

import com.example.exe201_heureux.model.DTO.ResponseObject;
import com.example.exe201_heureux.model.DTO.classservice.CreateReportRequestDTO;
import com.example.exe201_heureux.model.DTO.classservice.ProjectResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.ReportResponseDTO;
import com.example.exe201_heureux.model.DTO.classservice.UpdateReportRequestDTO;
import com.example.exe201_heureux.model.DTO.pagination.APIPageableResponseDTO;

public interface ReportServiceInterface {
    ResponseObject createReport(CreateReportRequestDTO requestDTO);
    APIPageableResponseDTO<ReportResponseDTO> getAllReports(int pageNo, int pageSize, String sortField, boolean ascending);
    APIPageableResponseDTO<ReportResponseDTO> getAllReportsByTeamId(Integer teamId,int pageNo, int pageSize, String sortField, boolean ascending);
    ResponseObject updateReport(Integer id, UpdateReportRequestDTO requestDTO);
}
