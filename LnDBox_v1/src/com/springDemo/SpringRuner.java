/**
 * 
 */
package com.springDemo;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.FileSystemXmlApplicationContext;

/**
 * This class is used to
 * 
 * @author Sumit 02-Nov-2013
 * 
 */
public class SpringRuner {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		ApplicationContext context = new FileSystemXmlApplicationContext(
				"/WebContent/config/springDemo/demo-spring.xml");
		HelloWorld world = (HelloWorld) context.getBean("helloworld");
		world.printMessage();
		world.printHelloMsg();
		HelloWorld worldII = (HelloWorld) context.getBean("helloworldII");
		worldII.printMessage();
		worldII.printHelloMsg();

		ApplicationContext classContxt = new FileSystemXmlApplicationContext(
				"/WebContent/config/springDemo/class-spring.xml");
		Class cls = (Class) classContxt.getBean("classObject");
		for (String clsObj : cls.getClassObjList().keySet()) {
			System.out.println(clsObj);
			System.out.println(cls.getClassObjList().get(clsObj).standard);
			System.out.println(cls.getClassObjList().get(clsObj).classSection);
			System.out.println("------------------------");
		}

	}

}
