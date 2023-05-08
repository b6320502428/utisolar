package backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import backend.model.TblApiKey;
import backend.service.TblApiKeyService;

@RestController
@RequestMapping("/api")
public class TblApiKeyController {
	
	@Autowired
	private TblApiKeyService tblApiKeyService;
	
	@GetMapping("/tblapikeys")
	public List<TblApiKey> getAll() {
		return tblApiKeyService.getAll();
	}
}
