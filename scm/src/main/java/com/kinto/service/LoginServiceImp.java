package com.kinto.service;

import org.springframework.stereotype.Component;

@Component
public class LoginServiceImp implements LoginService {

	@Override
	public boolean MetothAutenticate() {
		// TODO Auto-generated method stub
		System.out.println("Pasando por la clase service");
		return true;
	}
}
