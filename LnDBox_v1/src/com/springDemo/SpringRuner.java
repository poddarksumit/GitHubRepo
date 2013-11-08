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
				"/config/springDemo/demo-spring.xml");
		HelloWorld world = (HelloWorld) context.getBean("helloworld");
		world.printMessage();
		world.printHelloMsg();
		HelloWorld worldII = (HelloWorld) context.getBean("helloworldII");
		worldII.printMessage();
		worldII.printHelloMsg();

	}

}
