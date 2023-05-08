package backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.TblApiKey;

@Repository
public interface TblApiKeyRepository extends CrudRepository<TblApiKey, Integer> {

}
