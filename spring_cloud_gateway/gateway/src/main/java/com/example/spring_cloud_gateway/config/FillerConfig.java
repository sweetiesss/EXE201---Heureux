package com.example.spring_cloud_gateway.config;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

@Component
public class FillerConfig extends AbstractGatewayFilterFactory<FillerConfig.Config> {
    private final WebClient.Builder webClientBuilder;

    public FillerConfig(WebClient.Builder webClientBuilder) {
        super(Config.class);
        this.webClientBuilder = webClientBuilder;
    }

//    Extra filler
    @Override
    public GatewayFilter apply(Config config) {
        return null;
    }

//    Extra config
    public static class Config {
    }
}
