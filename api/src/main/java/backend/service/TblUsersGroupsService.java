package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblUsersGroups;
import backend.repository.TblUsersGroupsRepository;

@Service
public class TblUsersGroupsService {

	@Autowired
	private TblUsersGroupsRepository tblUsersGroupsRepository;
	
	public List<TblUsersGroups> getAll() {
		return (List<TblUsersGroups>) tblUsersGroupsRepository.findAll();
	}
}
