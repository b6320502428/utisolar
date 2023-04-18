package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import backend.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {

	@Query("from User u where u.username=:username")
	public User findByUsername(@Param("username")String username);
	
}