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
public class ClassObj {

	int standard = -1;
	char classSection;

	public ClassObj() {
		super();
	}

	public int getStandard() {
		return standard;
	}

	public void setStandard(int standard) {
		this.standard = standard;
	}

	public char getClassSection() {
		return classSection;
	}

	public void setClassSection(char classSection) {
		this.classSection = classSection;
	}

	private ClassObj(int standard, char classSection) {
		super();
		this.standard = standard;
		this.classSection = classSection;
	}

	public String toString() {
		return String.valueOf(this.standard) + this.classSection;
	}
}
