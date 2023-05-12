package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblEnergyMonitor;
import backend.service.TblEnergyMonitorService;

@RestController
@RequestMapping("/api")
public class TblEnergyMonitorController {

	@Autowired
	private TblEnergyMonitorService tblEnergyMonitorService;
	
	@GetMapping("/tblenergymonitors")
	public List<TblEnergyMonitor> getAll() {
		return tblEnergyMonitorService.getAll();
	}
	
	@GetMapping("/tblenergymonitors/getbysite/{site}")
	public List<TblEnergyMonitor> getBySite(@PathVariable("site") int site) {
		return tblEnergyMonitorService.getBySite(site);
	}
	
	@GetMapping("/tblenergymonitors/getcurrentpower/{site}")
	public Double getCurrentPower(@PathVariable("site") int site) {
		return tblEnergyMonitorService.getCurrentPower(site);
	}
	
	@GetMapping("/tblenergymonitors/getenergytoday/{site}")
	public Double getEnergyToday(@PathVariable("site") int site) {
		return tblEnergyMonitorService.getEnergyToday(site);
	}
	
	@GetMapping("/tblenergymonitors/getenergythismonth/{site}")
	public Double getEnergyThisMonth(@PathVariable("site") int site) {
		return tblEnergyMonitorService.getEnergyThisMonth(site);
	}
	
	@GetMapping("/tblenergymonitors/getsolutionthismonth/{site}")
	public List<Object> getSolutionThisMonth(@PathVariable("site") int site) {
		return tblEnergyMonitorService.getSolutionThisMonth(site);
	}
	
	@GetMapping("/tblenergymonitors/gethourcontoday/{site}")
	public List<Object> getHourConToday(@PathVariable("site") int site) {
		return tblEnergyMonitorService.getHourConToday(site);
	}
	
	@GetMapping("/tblenergymonitors/getmaxonpeak1/{day}/{site}")
	public Double getMaxOnPeak1(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyMonitorService.getMaxOnPeak1(day,site);
	}
	
	@GetMapping("/tblenergymonitors/getmaxoffpeak1/{day}/{site}")
	public Double getMaxOffPeak1(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyMonitorService.getMaxOffPeak1(day,site);
	}
	
	@GetMapping("/tblenergymonitors/getmaxoffpeak2/{day}/{site}")
	public Double getMaxOffPeak2(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyMonitorService.getMaxOffPeak2(day,site);
	}
	
	@GetMapping("/tblenergymonitors/getmaxonpeak2/{day}/{site}")
	public Double getMaxOnPeak2(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyMonitorService.getMaxOnPeak2(day,site);
	}
	
	@GetMapping("/tblenergymonitors/getsummonth/{day}/{site}")
	public Double getSumMonth(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyMonitorService.getSumMonth(day,site);
	}
	
	@GetMapping("/tblenergymonitors/getsumonpeak/{day}/{site}")
	public Double getOnPeak(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyMonitorService.getOnPeak(day,site);
	}
	
	@GetMapping("/tblenergymonitors/getsumoffpeak1/{day}/{site}")
	public Double getOffPeak1(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyMonitorService.getOffPeak1(day,site);
	}
	
	@GetMapping("/tblenergymonitors/getsumoffpeak2/{day}/{site}")
	public Double getOffPeak2(@PathVariable("day") String day,@PathVariable("site") int site) {
		return tblEnergyMonitorService.getOffPeak2(day,site);
	}
	
}
