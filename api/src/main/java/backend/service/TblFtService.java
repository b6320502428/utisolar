package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblFt;
import backend.repository.TblFtRepository;

@Service
public class TblFtService {

	@Autowired
	private TblFtRepository tblFtRepository;
	
	public List<TblFt> getAll() {
		return (List<TblFt>) tblFtRepository.findAll();
	}
	
	public TblFt getByTime(String time) {
		return tblFtRepository.getByTime(time);
	}
	
	public TblFt getLastTime() {
		return tblFtRepository.getLastTime();
	}
}
