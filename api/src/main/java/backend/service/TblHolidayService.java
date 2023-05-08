package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblHoliday;
import backend.repository.TblHolidayRepository;

@Service
public class TblHolidayService {

	@Autowired
	private TblHolidayRepository tblHolidayRepository;
	
	public List<TblHoliday> getAll() {
		return (List<TblHoliday>) tblHolidayRepository.findAll();
		
	}
}
