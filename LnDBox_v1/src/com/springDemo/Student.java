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
public class Student extends Member {
	ClassObj classOfStd = null;
	double aggre = 0.0;
	int rank = 0;
	SubjectObj subList = null;
	int id = 0;

	public ClassObj getClassOfStd() {
		return classOfStd;
	}

	public void setClassOfStd(ClassObj classOfStd) {
		this.classOfStd = classOfStd;
	}

	public SubjectObj getSubList() {
		return subList;
	}

	public void setSubList(SubjectObj subList) {
		this.subList = subList;
	}

	public double getAggre() {
		return aggre;
	}

	public void setAggre(double aggre) {
		this.aggre = aggre;
	}

	public int getRank() {
		return rank;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}

	public Student(double aggre, int rank) {
		setId((int) getId());
		this.aggre = aggre;
		this.rank = rank;
	}
	
	public Student() {
		
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.springDemo.Member#getTypeForRolNo()
	 */
	@Override
	public String getTypeForRolNo() {
		return "STD";
	}

}
