package com.dashboard.dashboard;

import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

import com.dashboard.dashboard.system.config.DotenvConfig;


@EnableRabbit
@SpringBootApplication
@PropertySource("classpath:application.properties")
public class DashboardApplication {

	public static void main(String[] args) {

        DotenvConfig.loadEnvironmentVariables();
		SpringApplication.run(DashboardApplication.class, args);
	}

}
