package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblUsersSite;

public interface TblUsersSiteRepository extends CrudRepository<TblUsersSite, Integer> {

	@Query(value = "SELECT * "
			+ "FROM tbl_users_site "
			+ "WHERE id_user = :idUser "
			,nativeQuery = true)
	public TblUsersSite getByUserId(@Param("idUser")int idUser);
}
