/**
 * 
 */
package com.springDemo;

import java.beans.PropertyEditorSupport;

/**
 * This class is used to
 * 
 * @author Sumit 10-Nov-2013
 * 
 */
public class AddressValueEditor extends PropertyEditorSupport {

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.beans.PropertyEditorSupport#setAsText(java.lang.String)
	 */
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		String[] addrSplit = text.split(":");
		setValue(new Address(addrSplit[0], addrSplit[1], addrSplit[2],
				addrSplit[3], addrSplit[4]));
	}

}
