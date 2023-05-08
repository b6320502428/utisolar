package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblFt;

public interface TblFtRepository extends CrudRepository<TblFt, Integer> {

	@Query(value = "SELECT * "
			+ "FROM tbl_ft "
			+ "WHERE CAST(time AT TIME ZONE 'asia/bangkok' AS text) LIKE concat('%', :time, '%') "
			,nativeQuery = true)
	public TblFt getByTime(@Param("time")String time);
	
	@Query(value = "SELECT * FROM tbl_ft WHERE time = (SELECT MAX(time) FROM tbl_ft);"
			,nativeQuery = true)
	public TblFt getLastTime();
}
