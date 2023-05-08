package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblEnergy;
import backend.service.TblEnergyService;

@RestController
@RequestMapping("/api")
public class TblEnergyController {

	@Autowired
	private TblEnergyService tblEnergyService;
	
	@GetMapping("/tblenergys")
	public List<TblEnergy> getAll() {
		return tblEnergyService.getAll();
	}
	
	@GetMapping("/tblenergys/getbydayandsite/{day}/{site}")
	public List<TblEnergy> get(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getByDayAndSite(day,site);
	}
	
	@GetMapping("/tblenergys/getsumeachhourbyday/{day}/{site}")
	public List<Object> getSumEachHourByDate(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getSumEachHourByDate(day,site);
	}
	
	@GetMapping("/tblenergys/getsumeachdaybyweek/{day}/{site}")
	public List<Object> getSumEachDayByWeek(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getSumEachDayByWeek(day,site);
	}
	
	@GetMapping("/tblenergys/getsumeachdaybymonth/{day}/{site}")
	public List<Object> getSumEachDayByMonth(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getSumEachDayByMonth(day,site);
	}
	
	@GetMapping("/tblenergys/getsumeachmonthbyyear/{day}/{site}")
	public List<Object> getSumEachMonthByYear(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getSumEachMonthByYear(day,site);
	}
	
	@GetMapping("/tblenergys/getsummonth/{day}/{site}")
	public Double getSumMonth(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getSumMonth(day,site);
	}
	
	@GetMapping("/tblenergys/getsumonpeak/{day}/{site}")
	public Double getOnPeak(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getOnPeak(day,site);
	}
	
	@GetMapping("/tblenergys/getsumoffpeak1/{day}/{site}")
	public Double getOffPeak1(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getOffPeak1(day,site);
	}
	
	@GetMapping("/tblenergys/getsumoffpeak2/{day}/{site}")
	public Double getOffPeak2(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyService.getOffPeak2(day,site);
	}
}
