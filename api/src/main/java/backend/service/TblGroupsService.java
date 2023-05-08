package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblGroups;
import backend.repository.TblGroupsRepository;

@Service
public class TblGroupsService {

	@Autowired
	private TblGroupsRepository tblGroupsRepository;
	
	public List<TblGroups> getAll() {
		return (List<TblGroups>) tblGroupsRepository.findAll();
	}
}
