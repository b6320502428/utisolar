package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblFt;
import backend.service.TblFtService;

@RestController
@RequestMapping("/api")
public class TblFtController {
	
	@Autowired
	private TblFtService tblFtService;
	
	@GetMapping("/tblfts")
	public List<TblFt> getAll() {
		return tblFtService.getAll();
	}
	
	@GetMapping("/tblfts/getlasttime")
	public TblFt getLastTime() {
		return tblFtService.getLastTime();
	}
	
	@GetMapping("/tblfts/getbytime/{time}")
	public TblFt getByTime(@PathVariable("time") String time) {
		return tblFtService.getByTime(time);
	}
}
