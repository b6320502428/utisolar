package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblSiteType;
import backend.service.TblSiteTypeService;

@RestController
@RequestMapping("/api")
public class TblSiteTypeController {

	@Autowired
	private TblSiteTypeService tblSiteTypeService;
	
	@GetMapping("/tblsitetypes")
	public List<TblSiteType> getAll() {
		return tblSiteTypeService.getAll();
	}
	
	@GetMapping("/tblsitetypes/getbyidsite/{idSite}")
	public TblSiteType getByIdSite(@PathVariable("idSite") int idSite) {
		return tblSiteTypeService.getByIdSite(idSite);
	}
}
