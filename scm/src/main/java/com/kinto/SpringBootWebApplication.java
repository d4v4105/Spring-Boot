package com.kinto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@EnableAutoConfiguration
public class SpringBootWebApplication  {
	
	@RequestMapping("/")
	public String login() {
		return "login";
	}
	
	public static void main(String[] args) {
		SpringApplication.run(SpringBootWebApplication.class, args);
	}
}
