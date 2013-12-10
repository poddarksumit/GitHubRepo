/**
 * 
 */
package com.springDemo;

/**
 * This class is used to
 * 
 * @author Sumit 09-Nov-2013
 * 
 */
public class SubjectObj {

	String subject = "";
	String subCode = "";

	/**
 * 
 */
	public SubjectObj() {
		// TODO Auto-generated constructor stub
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getSubCode() {
		return subCode;
	}

	public void setSubCode(String subCode) {
		this.subCode = subCode;
	}

	public SubjectObj(String subject, String subCode) {
		this.subject = subject;
		this.subCode = subCode;
	}

}
