package com.kinto;
import java.util.Map;

//@Controller
public class WelcomeController {

	// inject via application.properties
	//@Value("${welcome.message:test}")
	private String message = "Hello World";

	//@RequestMapping("/")
	public String login(Map<String, Object> model) {
		model.put("message", this.message);
		return "login";
	}

}