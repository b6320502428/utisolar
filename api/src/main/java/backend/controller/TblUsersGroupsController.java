package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblUsersGroups;
import backend.service.TblUsersGroupsService;

@RestController
@RequestMapping("/api")
public class TblUsersGroupsController {

	@Autowired
	private TblUsersGroupsService tblUsersGroupsService;
	
	@GetMapping("/tblusersgroups")
	public List<TblUsersGroups> getAll() {
		return tblUsersGroupsService.getAll();
	}
}
