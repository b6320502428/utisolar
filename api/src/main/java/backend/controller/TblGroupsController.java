package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblGroups;
import backend.service.TblGroupsService;

@RestController
@RequestMapping("/api")
public class TblGroupsController {

	@Autowired
	private TblGroupsService tblGroupsService;
	
	@GetMapping("/tblgroups")
	public List<TblGroups> getAll() {
		return tblGroupsService.getAll();
	}
}
