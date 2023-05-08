package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblUsersSite;
import backend.service.TblUsersSiteService;

@RestController
@RequestMapping("/api")
public class TblUsersSiteController {

	@Autowired
	private TblUsersSiteService tblUsersSiteService;
	
	@GetMapping("/tbluserssites")
	public List<TblUsersSite> getAll() {
		return tblUsersSiteService.getAll();
	}
	
	@GetMapping("/tbluserssites/getbyuserid/{idUser}")
	public TblUsersSite getByUserId(@PathVariable("idUser") int idUser) {
		return tblUsersSiteService.getByUserId(idUser);
	}
}
