package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblUsers;

public interface TblUsersRepository extends CrudRepository<TblUsers, Integer> {

	@Query("from TblUsers u where u.username=:username")
	public TblUsers getByUsername(@Param("username")String username);
}
