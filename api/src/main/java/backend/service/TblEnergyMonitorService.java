package backend.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblEnergyMonitor;
import backend.repository.TblEnergyMonitorRepository;

@Service
public class TblEnergyMonitorService {
	
	@Autowired
	private TblEnergyMonitorRepository tblEnergyMonitorRepository;
	
	public List<TblEnergyMonitor> getAll() {
		return (List<TblEnergyMonitor>) tblEnergyMonitorRepository.findAll();
	}
	
	public List<TblEnergyMonitor> getBySite(int site) {
		return (List<TblEnergyMonitor>) tblEnergyMonitorRepository.getBySite(site);
	}
	
	public Double getCurrentPower(int site) {
		LocalDate currentDate = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    String formattedDate = currentDate.format(formatter);
		LocalTime now = LocalTime.now();
		int minute = now.getMinute();
		int roundedMinute = minute / 15 * 15;
		LocalTime roundedTime = now.withMinute(roundedMinute);
		roundedTime = roundedTime.withSecond(0).withNano(0);
		String dateTime = formattedDate + "T" + roundedTime.toString();
		return tblEnergyMonitorRepository.getCurrentPower(dateTime,site);
	}
	
	public Double getEnergyToday(int site) {
		LocalDate currentDate = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    String formattedDate = currentDate.format(formatter);
		return tblEnergyMonitorRepository.getEnergyToday(formattedDate,site);
	}
	
	public Double getEnergyThisMonth(int site) {
		LocalDate currentDate = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
	    String formattedDate = currentDate.format(formatter);
		return tblEnergyMonitorRepository.getEnergyThisMonth(formattedDate,site);
	}
	
	public List<Object> getSolutionThisMonth(int site) {
		LocalDate currentDate = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM");
	    String formattedDate = currentDate.format(formatter);
		return tblEnergyMonitorRepository.getSolutionThisMonth(formattedDate,site);
	}
	
	public List<Object> getHourConToday(int site) {
		LocalDate currentDate = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    String formattedDate = currentDate.format(formatter);
		return tblEnergyMonitorRepository.getHourConToday(formattedDate,site);
	}
	
	public Double getMaxOnPeak1(String day,int site) {
		return tblEnergyMonitorRepository.getMaxOnPeak1(day,site);
	}
	
	public Double getMaxOffPeak1(String day,int site) {
		return tblEnergyMonitorRepository.getMaxOffPeak1(day,site);
	}
	
	public Double getMaxOffPeak2(String day,int site) {
		return tblEnergyMonitorRepository.getMaxOffPeak2(day,site);
	}
	
	public Double getMaxOnPeak2(String day,int site) {
		return tblEnergyMonitorRepository.getMaxOnPeak2(day,site);
	}
}
