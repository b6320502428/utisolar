package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblUsersSite;
import backend.repository.TblUsersSiteRepository;

@Service
public class TblUsersSiteService {

	@Autowired
	private TblUsersSiteRepository tblUsersSiteRepository;
	
	public List<TblUsersSite> getAll() {
		return (List<TblUsersSite>) tblUsersSiteRepository.findAll();
	}
	
	public TblUsersSite getByUserId(int idUser) {
		return tblUsersSiteRepository.getByUserId(idUser);
	}
}
