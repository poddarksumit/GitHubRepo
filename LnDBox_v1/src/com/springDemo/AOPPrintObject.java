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
public class AOPPrintObject {

	String msg = null;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public void printBefore() {
		System.out.println("AOPPrintObject before  ");
	}

	public void printAfter() {
		System.out.println("AOPPrintObject after ");
	}

}
