/**
 * 
 */
package com.springDemo;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * This class is used to
 * 
 * @author Sumit 09-Nov-2013
 * 
 */
public class Teacher extends Member {

	double salary = 0.0;
	ArrayList<String> classToTeach = new ArrayList<String>();
	HashMap<String, ArrayList<String>> classSubMap = new HashMap<String, ArrayList<String>>();

	public double getSalary() {
		return salary;
	}

	public void setSalary(double salary) {
		this.salary = salary;
	}

	public ArrayList<String> getClassToTeach() {
		return classToTeach;
	}

	public void setClassToTeach(ArrayList<String> classToTeach) {
		this.classToTeach = classToTeach;
	}

	public HashMap<String, ArrayList<String>> getClassSubMap() {
		return classSubMap;
	}

	public void setClassSubMap(HashMap<String, ArrayList<String>> classSubMap) {
		this.classSubMap = classSubMap;
	}

	private Teacher(double salary, ArrayList<String> classToTeach,
			HashMap<String, ArrayList<String>> classSubMap) {
		this.salary = salary;
		this.classToTeach = classToTeach;
		this.classSubMap = classSubMap;
	}

}
