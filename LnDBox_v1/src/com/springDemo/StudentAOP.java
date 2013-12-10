/**
 * 
 */
package com.springDemo;

import org.aopalliance.aop.Advice;

/**
 * This class is used to
 * 
 * @author Sumit 09-Nov-2013
 * 
 */
public class StudentAOP implements ClassAopInterface{

	private Class clsList = null;
	private Subject subList = null;

	public Class getClsList() {
		return clsList;
	}

	public void setClsList(Class clsList) {
		this.clsList = clsList;
	}

	public Subject getSubList() {
		return subList;
	}

	public void setSubList(Subject subList) {
		this.subList = subList;
	}

	public void verifyClassEntered(Object classOfStd) {
		System.out.println("Hello");
		if (!clsList.getClassObjList().containsKey(classOfStd.toString())) {
			System.out.println("Hello");
		}
	}


	/* (non-Javadoc)
	 * @see com.springDemo.ClassAopInterface#verifySubjectEntered(java.lang.Object)
	 */
	@Override
	public void verifySubjectEntered(Object classOfStd) {
		// TODO Auto-generated method stub
		
	}

	/* (non-Javadoc)
	 * @see org.springframework.aop.Advisor#getAdvice()
	 */
	@Override
	public Advice getAdvice() {
		// TODO Auto-generated method stub
		return null;
	}

	/* (non-Javadoc)
	 * @see org.springframework.aop.Advisor#isPerInstance()
	 */
	@Override
	public boolean isPerInstance() {
		// TODO Auto-generated method stub
		return false;
	}
}
