package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblSite;
import backend.service.TblSiteService;

@RestController
@RequestMapping("/api")
public class TblSiteController {

	@Autowired
	private TblSiteService tblSiteService;
	
	@GetMapping("/tblsites")
	public List<TblSite> getAll() {
		return tblSiteService.getAll();
	}
	
	@GetMapping("/tblsites/getbyid/{siteId}")
	public TblSite getById(@PathVariable("siteId") int siteId) {
		return tblSiteService.getById(siteId);
	}
}
