package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblEnergy;
import backend.repository.TblEnergyRepository;

@Service
public class TblEnergyService {

	@Autowired
	private TblEnergyRepository tblEnergyRepository;

	public List<TblEnergy> getAll() {
		return (List<TblEnergy>) tblEnergyRepository.findAll();
	}

	public List<TblEnergy> getByDayAndSite(String day, int site) {
		return (List<TblEnergy>) tblEnergyRepository.getByDayAndSite(day, site);
	}

	public List<Object> getSumEachHourByDate(String day, int site) {
		return (List<Object>) tblEnergyRepository.getSumEachHourByDate(day, site);
	}

	public List<Object> getSumEachDayByWeek(String day, int site) {
		return (List<Object>) tblEnergyRepository.getSumEachDayByWeek(day, site);
	}

	public List<Object> getSumEachDayByMonth(String day, int site) {
		return (List<Object>) tblEnergyRepository.getSumEachDayByMonth(day, site);
	}

	public List<Object> getSumEachMonthByYear(String day, int site) {
		return (List<Object>) tblEnergyRepository.getSumEachMonthByYear(day, site);
	}

	public Double getSumMonth(String day, int site) {
		return tblEnergyRepository.getSumMonth(day, site);
	}

	public Double getOnPeak(String day, int site) {
		return tblEnergyRepository.getOnPeak(day, site);
	}

	public Double getOffPeak1(String day, int site) {
		return tblEnergyRepository.getOffPeak1(day, site);
	}

	public Double getOffPeak2(String day, int site) {
		return tblEnergyRepository.getOffPeak2(day, site);
	}
}
