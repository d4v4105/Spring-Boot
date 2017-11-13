package com.kinto.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.kinto.model.LoginModel;
import com.kinto.service.LoginService;

@Controller
public class LoginController {

	//@Autowired
	//LoginService loginservice;

	@RequestMapping("/login")
	public String login(ModelMap model) {

		//ModelMap  model = new  ModelMap();
		
		
		//model.addAttribute(loginmodel);
		
		model.addAttribute("message", "Spring 3 MVC Hello World");
		
		//System.out.println(loginservice.MetothAutenticate());
		
		return "login";
		
		
		//return "login";
		//return new ModelAndView("login");
	}

}
