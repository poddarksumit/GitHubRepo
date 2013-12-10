/**
 * 
 */
package com.springDemo;

import java.lang.reflect.Method;

import org.springframework.beans.factory.support.MethodReplacer;

/**
 * This class is used to
 * 
 * @author Sumit 09-Nov-2013
 * 
 */
public class UniqueIdGen implements MethodReplacer {

	static int idCount = 0000;

	public static int getIdCount() {
		return idCount++;
	}

	public static void setIdCount(int idCount) {
		UniqueIdGen.idCount = idCount;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.beans.factory.support.MethodReplacer#reimplement(
	 * java.lang.Object, java.lang.reflect.Method, java.lang.Object[])
	 */
	@Override
	public Object reimplement(Object arg0, Method arg1, Object[] arg2)
			throws Throwable {
		idCount =  idCount+1;
		return idCount;
	}

}
