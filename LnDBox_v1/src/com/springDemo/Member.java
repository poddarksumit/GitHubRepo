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
public abstract class Member {

	String type = "";
	String name = "";
	int age = 0;
	Address address = null;
	PhoneNumber phoneNo = null;
	String schoolName = "";

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public PhoneNumber getPhoneNo() {
		return phoneNo;
	}

	public void setPhoneNo(PhoneNumber phoneNo) {
		this.phoneNo = phoneNo;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	private Member(String type, String name, int age) {
		this.type = type;
		this.name = name;
		this.age = age;
	}

	public Member() {
	}

	public abstract String getTypeForRolNo();

}
