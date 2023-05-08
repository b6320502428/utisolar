package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblUsers;
import backend.repository.TblUsersRepository;

@Service
public class TblUsersService {

	@Autowired
	private TblUsersRepository tblUsersRepository;
	
	public List<TblUsers> getAll() {
		return (List<TblUsers>) tblUsersRepository.findAll();
	}
	
	public TblUsers getByUsername(String username) {
		return tblUsersRepository.getByUsername(username);
	}
	
	public TblUsers getById(int id) {
		return tblUsersRepository.findById(id).get();
	}
	
	public TblUsers authenticateUser(String username,String password) {
		TblUsers user = tblUsersRepository.getByUsername(username);
		if(password == user.getPassword()) {
			return user;
		}
		else
			return null;
	}
}
