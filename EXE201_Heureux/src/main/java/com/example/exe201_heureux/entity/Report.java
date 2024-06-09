package com.example.exe201_heureux.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Report")
public class Report {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teamid")
    private Team teamid;

    @Column(name = "create_date")
    private Instant createDate;

    @Lob
    @Column(name = "description")
    private String description;

    @Size(max = 50)
    @Column(name = "status", length = 50)
    private String status;

}