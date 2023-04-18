package backend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.Report;

@Repository
public interface ReportRepository extends CrudRepository<Report, Integer> {

}
