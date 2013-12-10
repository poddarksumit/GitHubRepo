/**
 * 
 */
package com.springDemo;

import org.springframework.aop.Advisor;

/**
 * This class is used to  
 * 
 * @author Sumit
 *13-Nov-2013
 * 
 */
public interface ClassAopInterface extends Advisor{

	public void verifyClassEntered(Object classOfStd);
	public void verifySubjectEntered(Object classOfStd);
}
