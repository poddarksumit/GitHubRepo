/**
 * 
 */
package com.springDemo;

/**
 * This class is used to
 * 
 * @author Sumit 28-Oct-2013
 * 
 */
public class HelloWorld {

	String message = "";
	HelloWorldName propMsg = null;
	String helloMsg = "";
	String testing = "";
	String testing1 = "";

	private HelloWorld(String message, HelloWorldName propMsg) {
		super();
		this.message = message;
		this.propMsg = propMsg; 
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public void printMessage() {
		System.out.println("Message : " + getMessage() + " . Prop Msg : "
				+ this.propMsg.getName());
	}

	public HelloWorldName getPropMsg() {
		return propMsg;
	}

	public void setPropMsg(HelloWorldName propMsg) {
		this.propMsg = propMsg;
	}

	public String getHelloMsg() {
		return helloMsg;
	}

	public void setHelloMsg(String helloMsg) {
		this.helloMsg = helloMsg;
	}

	public void printHelloMsg() {
		System.out.println("Hello Msg : " + getHelloMsg());
	}
}
