package com.example.exe201_heureux;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class Exe201HeureuxApplication {

    public static void main(String[] args) {
        SpringApplication.run(Exe201HeureuxApplication.class, args);
    }

}
