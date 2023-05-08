package backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.TblApiKey;
import backend.repository.TblApiKeyRepository;

@Service
public class TblApiKeyService {
	
	@Autowired
	private TblApiKeyRepository tblApiKeyRepository;
	
	public List<TblApiKey> getAll() {
		return (List<TblApiKey>) tblApiKeyRepository.findAll();
		
	}
}
