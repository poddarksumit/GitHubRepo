/**
 * 
 */
package com.springDemo;

import java.util.HashMap;
import java.util.Set;
import java.util.TreeSet;

/**
 * This class is used to
 * 
 * @author Sumit 09-Nov-2013
 * 
 */
public class Class {

	public Class() {
	}

	private HashMap<String, ClassObj> classObjList = new HashMap<String, ClassObj>();

	public HashMap<String, ClassObj> getClassObjList() {
		return classObjList;
	}

	public void setClassObjList(HashMap<String, ClassObj> classObjList) {
		this.classObjList = classObjList;
	}

	public Class(HashMap<String, ClassObj> classObjList) {
		this.classObjList = classObjList;
	}

}
