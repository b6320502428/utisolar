package backend.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblPower;
import backend.repository.TblPowerRepository;

@Service
public class TblPowerService {

	@Autowired
	private TblPowerRepository tblPowerRepository;
	
	public List<TblPower> getAll() {
		return (List<TblPower>)tblPowerRepository.findAll();
	}
	
	public List<Object> getHourSolutionToday(int site) {
		LocalDate currentDate = LocalDate.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
	    String formattedDate = currentDate.format(formatter);
		return tblPowerRepository.getHourSolutionToday(formattedDate,site);
	}
}
