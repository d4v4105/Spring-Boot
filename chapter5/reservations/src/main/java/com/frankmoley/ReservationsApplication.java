package com.frankmoley;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.frankmoley.landon")
public class ReservationsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReservationsApplication.class, args);
	}
}
