package backend.model;
// Generated Apr 24, 2023, 9:30:03 AM by Hibernate Tools 6.1.5.Final

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * TblHoliday generated by hbm2java
 */

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TblHoliday implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private TblHolidayId id;

	public TblHoliday() {
	}

	public TblHoliday(TblHolidayId id) {
		this.id = id;
	}

	public TblHolidayId getId() {
		return this.id;
	}

	public void setId(TblHolidayId id) {
		this.id = id;
	}

}
