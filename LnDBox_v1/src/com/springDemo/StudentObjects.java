/**
 * 
 */
package com.springDemo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * This class is used to
 * 
 * @author Sumit 09-Nov-2013
 * 
 */
public class StudentObjects {
	static ApplicationContext studObjects = null;
	static {
		studObjects = new FileSystemXmlApplicationContext(
				"http://localhost:8080/lndbox/config/springDemo/student-spring.xml");
	}

	/**
	 * @param args
	 */
	public static List<Student> getStudent() {
		List<Student> studList = new ArrayList<Student>();
		studList.add((Student) studObjects.getBean("stud-manish"));
		//studList.add((Student) studObjects.getBean("stud-sumit"));
		return studList;

	}
	
	/*public static void main(String[] args) {
		StudentObjects.getStudent();
	}*/

}
