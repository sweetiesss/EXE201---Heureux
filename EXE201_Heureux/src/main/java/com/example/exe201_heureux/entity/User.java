package com.example.exe201_heureux.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "User")
public class User {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @Column(name = "email", nullable = false, length = 100)
    private String email;

    @Size(max = 255)
    @Column(name = "password", nullable = false)
    private String password;

    @Size(max = 20)
    @Column(name = "phone", length = 20)
    private String phone;

    @Lob
    @Column(name = "address")
    private String address;

    @Column(name = "DOB")
    private LocalDate dob;

    @Size(max = 10)
    @Column(name = "gender", length = 10)
    private String gender;

    @Size(max = 50)
    @Column(name = "username", nullable = false, length = 50)
    private String username;

    @Size(max = 50)
    @Column(name = "status", length = 50)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roleid")
    private Role roleid;

    @Size(max = 100)
    @Column(name = "avatar", length = 100)
    private String avatar;

}