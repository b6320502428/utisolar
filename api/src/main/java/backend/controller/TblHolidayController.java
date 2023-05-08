package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblHoliday;
import backend.service.TblHolidayService;

@RestController
@RequestMapping("/api")
public class TblHolidayController {

	@Autowired
	private TblHolidayService tblHolidayService;
	
	@GetMapping("/tblholidays")
	public List<TblHoliday> getAll() {
		return tblHolidayService.getAll();
	}
}
