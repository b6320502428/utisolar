package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblBillingType;
import backend.repository.TblBillingTypeRepository;

@Service
public class TblBillingTypeService {
	
	@Autowired
	private TblBillingTypeRepository tblBillingTypeRepository;
	
	public List<TblBillingType> getAll() {
		return (List<TblBillingType>) tblBillingTypeRepository.findAll();
	}
	
	public TblBillingType getById(int id) {
		return tblBillingTypeRepository.getById(id);
	}
}
