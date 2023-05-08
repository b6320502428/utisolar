package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblBillingType;
import backend.service.TblBillingTypeService;

@RestController
@RequestMapping("/api")
public class TblBillingTypeController {

	@Autowired
	private TblBillingTypeService tblBillingTypeService;
	
	@GetMapping("/tblbillingtypes")
	public List<TblBillingType> getAll() {
		return tblBillingTypeService.getAll();
	}
	
	@GetMapping("/tblbillingtypes/getbyid/{id}")
	public TblBillingType getById(@PathVariable("id") int id) {
		return tblBillingTypeService.getById(id);
	}
}
