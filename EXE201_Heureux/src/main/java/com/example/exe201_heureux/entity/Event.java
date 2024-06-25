package com.example.exe201_heureux.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "Event")
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "createDate")
    private LocalDateTime createDate;

    @Column(name = "endDate")
    private LocalDateTime endDate;

    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "teamId")
    private Team team;
    @PrePersist
    protected void onCreate() {
        createDate = LocalDateTime.now();
    }
}
