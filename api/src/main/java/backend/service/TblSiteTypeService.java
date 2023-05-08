package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblSiteType;
import backend.repository.TblSiteTypeRepository;

@Service
public class TblSiteTypeService {

	@Autowired
	private TblSiteTypeRepository tblSiteTypeRepository;
	
	public List<TblSiteType> getAll() {
		return (List<TblSiteType>) tblSiteTypeRepository.findAll();
	}
	
	public TblSiteType getByIdSite(int idSite) {
		return tblSiteTypeRepository.getByIdSite(idSite);
	}
}
