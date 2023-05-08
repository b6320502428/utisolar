package backend.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import backend.model.TblBillingType;

public interface TblBillingTypeRepository extends CrudRepository<TblBillingType, Integer> {

	@Query(value = "SELECT * "
			+ "FROM tbl_billing_type "
			+ "WHERE tbl_billing_type.id = :id "
			,nativeQuery = true)
	public TblBillingType getById(@Param("id")int id);
}
