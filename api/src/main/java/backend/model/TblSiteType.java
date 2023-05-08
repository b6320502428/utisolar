package backend.model;
// Generated Apr 24, 2023, 9:30:03 AM by Hibernate Tools 6.1.5.Final

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * TblSiteType generated by hbm2java
 */

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TblSiteType implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private TblSiteTypeId id;

	public TblSiteType() {
	}

	public TblSiteType(TblSiteTypeId id) {
		this.id = id;
	}

	public TblSiteTypeId getId() {
		return this.id;
	}

	public void setId(TblSiteTypeId id) {
		this.id = id;
	}

}