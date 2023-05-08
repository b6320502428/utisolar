package backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblUsers;
import backend.service.TblUsersService;

@RestController
@RequestMapping("/api")
public class AuthController {

	@Autowired
	private TblUsersService tblUsersService;

	@PostMapping("/auth/login")
	public ResponseEntity<?> login(@RequestBody TblUsers user) {
		TblUsers existingUser = tblUsersService.getByUsername(user.getUsername());
		
		if (existingUser != null && new BCryptPasswordEncoder().matches(user.getPassword(), existingUser.getPassword())) {
			return ResponseEntity.ok("");
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
		}
	}

}
