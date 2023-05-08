package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblUsers;
import backend.service.TblUsersService;

@RestController
@RequestMapping("/api")
public class TblUsersController {

	@Autowired
	private TblUsersService tblUsersService;
	
	@GetMapping("/tblusers")
	public List<TblUsers> getAll() {
		return tblUsersService.getAll();
	}
	
	@GetMapping("/tbluser/getbyusername/{username}")
	public TblUsers getByUsername(@PathVariable("username") String username) {
		return tblUsersService.getByUsername(username);
	}
	
	@GetMapping("/tbluser/getbyid/{id}")
	public TblUsers getById(@PathVariable("id") int id) {
		return tblUsersService.getById(id);
	}
}
