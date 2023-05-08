package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblSite;
import backend.repository.TblSiteRepository;

@Service
public class TblSiteService {

	@Autowired
	private TblSiteRepository tblSiteRepository;
	
	public List<TblSite> getAll() {
		return (List<TblSite>) tblSiteRepository.findAll();
	}
	
	public TblSite getById(int siteId) {
		return tblSiteRepository.getBySiteId(siteId);
	}
}
