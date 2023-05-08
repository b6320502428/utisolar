package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblPower;

public interface TblPowerRepository extends CrudRepository<TblPower, Integer> {
	@Query(value = "SELECT time AT TIME ZONE 'asia/bangkok' AS time, "
			+ "kw_cons, kw_feedin, kw_production, kw_purchesed,kw_selfcons "
			+ "FROM tbl_power "
			+ "WHERE id_site = :site "
			+ "AND CAST(time AT TIME ZONE 'asia/bangkok' AS text) LIKE concat('%', :day, '%') "
			+ "ORDER BY time"
			,nativeQuery = true)
	List<Object> getHourSolutionToday(@Param("day")String day,@Param("site")int site);
}
