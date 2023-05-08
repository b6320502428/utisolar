package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblSite;

public interface TblSiteRepository extends CrudRepository<TblSite, Integer> {

	@Query(value = "SELECT * "
			+ "FROM tbl_site "
			+ "WHERE id = :siteId "
			,nativeQuery = true)
	public TblSite getBySiteId(@Param("siteId")int siteId);
	
}
