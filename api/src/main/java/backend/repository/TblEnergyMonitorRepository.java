package backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblEnergyMonitor;

public interface TblEnergyMonitorRepository extends CrudRepository<TblEnergyMonitor, Integer> {
	
	@Query(value = "SELECT * "
			+ "FROM tbl_energy_monitor "
			+ "WHERE id_site = :site "
			+ "ORDER BY final_time DESC"
			,nativeQuery = true)
	List<TblEnergyMonitor> getBySite(@Param("site")int site);
	
	@Query(value = "SELECT SUM(kwh_cons) AS kwh_cons_today "
			+ "FROM tbl_energy_monitor "
			+ "WHERE id_site = :site "
			+ "AND CAST(final_time AT TIME ZONE 'asia/bangkok' AS text) LIKE concat('%', :day, '%')"
			,nativeQuery = true)
	Double getEnergyToday(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT kwdemand "
			+ "FROM tbl_energy_monitor "
			+ "WHERE id_site = :site "
			+ "AND final_time AT TIME ZONE 'asia/bangkok' = CAST(:day AS TIMESTAMP)"
			,nativeQuery = true)
	Double getCurrentPower(@Param("day")String day,@Param("site")int site);

	@Query(value = "SELECT SUM(kwh_cons) AS kwh_cons_this_month "
			+ "FROM tbl_energy_monitor "
			+ "WHERE id_site = :site "
			+ "AND CAST(final_time AT TIME ZONE 'asia/bangkok' AS text) LIKE concat('%', :day, '%')"
			,nativeQuery = true)
	Double getEnergyThisMonth(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT MAX(total_cons) AS kwh_cons_max_this_month, "
			+ "AVG(total_cons) AS kwh_cons_avg_this_month, "
			+ "MIN(total_cons) AS kwh_cons_min_this_month "
			+ "FROM (SELECT DATE_TRUNC('day', final_time AT TIME ZONE 'asia/bangkok') AS day,"
			+ "SUM(kwh_cons) AS total_cons "
			+ "FROM tbl_energy_monitor "
			+ "WHERE id_site = :site "
			+ "AND CAST(final_time AT TIME ZONE 'asia/bangkok' AS text) LIKE concat('%', :day, '%')"
			+ "GROUP BY DATE_TRUNC('day', final_time AT TIME ZONE 'asia/bangkok'))total WHERE total_cons > 0"
			,nativeQuery = true)
	List<Object> getSolutionThisMonth(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT DATE_TRUNC('hour', begin_time AT TIME ZONE 'asia/bangkok') AS hour, "
			+ "SUM(kwh_cons) AS total_kwh_cons "
			+ "FROM tbl_energy_monitor "
			+ "WHERE id_site = :site "
			+ "AND CAST(begin_time AT TIME ZONE 'asia/bangkok' AS text) LIKE concat('%', :day, '%') "
			+ "GROUP BY hour "
			+ "ORDER BY hour"
			,nativeQuery = true)
	List<Object> getHourConToday(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT MAX(kwdemand) "
			+ "FROM tbl_energy_monitor LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE id_site = :site "
			+ "AND DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy_monitor.final_time) BETWEEN 9 AND 22 "
			+ "AND tbl_holiday.holiday_date IS NULL "
			//+ "ORDER BY tbl_energy_monitor.final_time "
			,nativeQuery = true)
	Double getMaxOnPeak1(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT MAX(kwdemand) "
			+ "FROM tbl_energy_monitor LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND id_site = :site "
			+ "AND ((EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy_monitor.final_time) >= 22) "
			+ "OR (EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy_monitor.final_time) < 9)) "
			+ "AND tbl_holiday.holiday_date IS NULL "
			,nativeQuery = true)
	Double getMaxOffPeak1(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT MAX(kwdemand) "
			+ "FROM tbl_energy_monitor LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND id_site = :site "
			+ "AND (EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) IN (0, 6) "
			+ "OR tbl_holiday.holiday_date IS NOT NULL) "
			,nativeQuery = true)
	Double getMaxOffPeak2(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT MAX(kvardemand) "
			+ "FROM tbl_energy_monitor LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE id_site = :site "
			+ "AND DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy_monitor.final_time) BETWEEN 9 AND 22 "
			+ "AND tbl_holiday.holiday_date IS NULL "
			//+ "ORDER BY tbl_energy_monitor.final_time "
			,nativeQuery = true)
	Double getMaxOnPeak2(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT SUM(kwh_cons) AS total_kwh_cons FROM tbl_energy_monitor "
			+ "WHERE DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', "
			+ "CAST(concat('%', :day, '%') AS TIMESTAMP)) AND id_site = :site GROUP BY DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok')"
			,nativeQuery = true)
	Double getSumMonth(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT SUM(kwh_cons) "
			+ "FROM tbl_energy_monitor LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND id_site = :site "
			+ "AND EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy_monitor.final_time) BETWEEN 9 AND 22 "
			+ "AND tbl_holiday.holiday_date IS NULL "
			,nativeQuery = true)
	Double getOnPeak(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT SUM(kwh_cons) "
			+ "FROM tbl_energy_monitor LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND id_site = :site "
			+ "AND ((EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy_monitor.final_time) >= 22) "
			+ "OR (EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) BETWEEN 1 AND 5 "
			+ "AND EXTRACT(hour FROM tbl_energy_monitor.final_time) < 9)) "
			+ "AND tbl_holiday.holiday_date IS NULL "
			,nativeQuery = true)
	Double getOffPeak1(@Param("day")String day,@Param("site")int site);
	
	@Query(value = "SELECT SUM(kwh_cons) "
			+ "FROM tbl_energy_monitor LEFT JOIN tbl_holiday "
			+ "ON DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') =  DATE_TRUNC('day', tbl_holiday.holiday_date AT TIME ZONE 'asia/bangkok') "
			+ "WHERE DATE_TRUNC('month', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok') = DATE_TRUNC('month', CAST(concat('%', :day, '%') AS TIMESTAMP)) "
			+ "AND id_site = :site "
			+ "AND (EXTRACT(dow FROM(DATE_TRUNC('day', tbl_energy_monitor.final_time AT TIME ZONE 'asia/bangkok'))) IN (0, 6) "
			+ "OR tbl_holiday.holiday_date IS NOT NULL) "
			,nativeQuery = true)
	Double getOffPeak2(@Param("day")String day,@Param("site")int site);
}
