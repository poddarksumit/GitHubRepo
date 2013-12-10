/**
 * 
 */
package com.springDemo;

import java.util.HashMap;

/**
 * This class is used to
 * 
 * @author Sumit 09-Nov-2013
 * 
 */
public class Subject {
	private HashMap<String, SubjectObj> subObjList = new HashMap<String, SubjectObj>();

	/**
	 * 
	 */
	public Subject() {
		// TODO Auto-generated constructor stub
	}
	
	public HashMap<String, SubjectObj> getSubObjList() {
		return subObjList;
	}

	public void setSubObjList(HashMap<String, SubjectObj> subObjList) {
		this.subObjList = subObjList;
	}

	public Subject(HashMap<String, SubjectObj> subObjList) {
		super();
		this.subObjList = subObjList;
	}

	
}
