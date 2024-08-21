package com.dashboard.dashboard.system.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {

    public static void loadEnvironmentVariables() {
        Dotenv dotenv = Dotenv.configure().load();

        System.setProperty("spring.application.name", dotenv.get("SPRING_APPLICATION_NAME"));
        System.setProperty("spring.datasource.url", dotenv.get("SPRING_DATASOURCE_URL"));
        System.setProperty("spring.datasource.username", dotenv.get("SPRING_DATASOURCE_USERNAME"));
        System.setProperty("spring.datasource.password", dotenv.get("SPRING_DATASOURCE_PASSWORD"));
        System.setProperty("spring.jpa.hibernate.ddl-auto", dotenv.get("SPRING_JPA_HIBERNATE_DDL_AUTO"));
        System.setProperty("spring.rabbitmq.host", dotenv.get("SPRING_RABBITMQ_HOST"));
        System.setProperty("spring.rabbitmq.port", dotenv.get("SPRING_RABBITMQ_PORT"));
        System.setProperty("spring.rabbitmq.username", dotenv.get("SPRING_RABBITMQ_USERNAME"));
        System.setProperty("spring.rabbitmq.password", dotenv.get("SPRING_RABBITMQ_PASSWORD"));

        System.setProperty("spring.cors.allowed.origins", dotenv.get("CORS_ALLOWED_ORIGINS"));
        System.setProperty("spring.rabbitmq.exchange.name", dotenv.get("RABBITMQ_EXCHANGE_NAME"));
        System.setProperty("spring.rabbitmq.routing.key", dotenv.get("RABBITMQ_ROUTING_KEY"));
        System.setProperty("spring.rabbitmq.queue.name", dotenv.get("RABBITMQ_QUEUE_NAME"));
    }
}
