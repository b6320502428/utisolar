package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblPower;
import backend.service.TblPowerService;

@RestController
@RequestMapping("/api")
public class TblPowerController {

	@Autowired
	private TblPowerService tblPowerService;
	
	@GetMapping("/tblpowers")
	public List<TblPower> getAll() {
		return tblPowerService.getAll();
	}
	
	@GetMapping("/tblpowers/gethoursolutiontoday/{site}")
	public List<Object> getHourSolutionToday(@PathVariable("site") int site) {
		return tblPowerService.getHourSolutionToday(site);
	}
}
