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
public class Address {

	String addssLine1 = "";
	String addssLine2 = "";
	String street = "";
	String state = "";
	String pincode = "";

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getAddssLine1() {
		return addssLine1;
	}

	public void setAddssLine1(String addssLine1) {
		this.addssLine1 = addssLine1;
	}

	public String getAddssLine2() {
		return addssLine2;
	}

	public void setAddssLine2(String addssLine2) {
		this.addssLine2 = addssLine2;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Address(String addssLine1, String addssLine2, String street,
			String state, String pincode) {
		super();
		this.addssLine1 = addssLine1;
		this.addssLine2 = addssLine2;
		this.street = street;
		this.state = state;
		this.pincode = pincode;
	}

}
