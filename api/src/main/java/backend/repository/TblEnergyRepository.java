package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblEnergy;

public interface TblEnergyRepository extends CrudRepository<TblEnergy, Integer> {

	@Query(value = "SELECT * FROM tbl_energy WHERE CAST(time AT TIME ZONE 'asia/bangkok' AS text) LIKE concat('%', :day, '%') AND tbl_energy.id_site = :site ORDER BY time",nativeQuery = true)
	List<TblEnergy> getByDayAndSite(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT DATE_TRUNC('hour', time AT TIME ZONE 'asia/bangkok') AS hour,SUM(consumption) AS total_consumption,SUM(production) AS total_production,SUM(selfconsumption) AS total_self_consumption,SUM(export) AS total_export,SUM(import) AS total_import FROM tbl_energy WHERE CAST(time AT TIME ZONE 'asia/bangkok' AS text) LIKE concat('%', :day, '%') AND id_site = :site GROUP BY hour ORDER BY hour",nativeQuery = true)
	List<Object> getSumEachHourByDate(@Param("day")String day,@Param("site")int site);

	@Query(value = "SELECT DATE_TRUNC('day', time AT TIME ZONE 'asia/bangkok') AS day, SUM(consumption) AS total_consumption,SUM(production) AS total_production,SUM(selfconsumption) AS total_self_consumption,SUM(export) AS total_export,SUM(import) AS total_import FROM tbl_energy WHERE time >= DATE_TRUNC('day', CAST(concat('%', :day, '%') AS TIMESTAMP)) AND time < DATE_TRUNC('day', CAST(concat('%', :day, '%') AS TIMESTAMP)) + INTERVAL '7 days' AND id_site = :site GROUP BY DATE_TRUNC('day', time AT TIME ZONE 'asia/bangkok') ORDER BY day ASC",nativeQuery = true)
	List<Object> getSumEachDayByWeek(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT DATE_TRUNC('day', time AT TIME ZONE 'asia/bangkok') AS day, SUM(consumption) AS total_consumption,SUM(production) AS total_production,SUM(selfconsumption) AS total_self_consumption,SUM(export) AS total_export,SUM(import) AS total_import FROM tbl_energy WHERE DATE_TRUNC('month', time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) AND id_site = :site GROUP BY DATE_TRUNC('day', time AT TIME ZONE 'asia/bangkok') ORDER BY day ASC",nativeQuery = true)
	List<Object> getSumEachDayByMonth(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT DATE_TRUNC('month', time AT TIME ZONE 'asia/bangkok') AS month, SUM(consumption) AS total_consumption,SUM(production) AS total_production,SUM(selfconsumption) AS total_self_consumption,SUM(export) AS total_export,SUM(import) AS total_import FROM tbl_energy WHERE DATE_TRUNC('year', time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('year', CAST(concat('%', :day, '%') AS TIMESTAMP)) AND id_site = :site GROUP BY DATE_TRUNC('month', time AT TIME ZONE 'asia/bangkok') ORDER BY month ASC",nativeQuery = true)
	List<Object> getSumEachMonthByYear(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT SUM(selfconsumption) AS total_self_consumption FROM tbl_energy WHERE DATE_TRUNC('month', time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) AND id_site = :site GROUP BY DATE_TRUNC('month', time AT TIME ZONE 'asia/bangkok')",nativeQuery = true)
	Double getSumMonth(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT SUM(selfconsumption) "
			+ "FROM tbl_energy LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy.time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE DATE_TRUNC('month', tbl_energy.time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND id_site = :site "
			+ "AND EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy.time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy.time) BETWEEN 9 AND 22 "
			+ "AND tbl_holiday.holiday_date IS NULL "
			,nativeQuery = true)
	Double getOnPeak(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT SUM(selfconsumption) "
			+ "FROM tbl_energy LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy.time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE DATE_TRUNC('month', tbl_energy.time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND id_site = :site "
			+ "AND ((EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy.time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy.time) >= 22) "
			+ "OR (EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy.time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy.time) < 9)) "
			+ "AND tbl_holiday.holiday_date IS NULL "
			,nativeQuery = true)
	Double getOffPeak1(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT SUM(selfconsumption) "
			+ "FROM tbl_energy LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy.time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE DATE_TRUNC('month', tbl_energy.time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND id_site = :site "
			+ "AND (EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy.time AT TIME ZONE 'asia/bangkok'))) IN (0, 6) "
			+ "OR tbl_holiday.holiday_date IS NOT NULL) "
			,nativeQuery = true)
	Double getOffPeak2(@Param("day")String day,@Param("site")int site);
}
