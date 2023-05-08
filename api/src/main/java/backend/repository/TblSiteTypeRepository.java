package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblSiteType;

public interface TblSiteTypeRepository extends CrudRepository<TblSiteType, Integer> {

	@Query(value = "SELECT * "
			+ "FROM tbl_site_type "
			+ "WHERE id_site = :idSite "
			,nativeQuery = true)
	public TblSiteType getByIdSite(@Param("idSite")int idSite);
}
