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
public class PhoneNumberEditor extends PropertyEditorSupport {

	/*
	 * (non-Javadoc)
	 * 
	 * @see java.beans.PropertyEditorSupport#setAsText(java.lang.String)
	 */
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		String textNew = removeNonNumbers(text);
		PhoneNumber number = null;
		if (textNew.length() == 11) {
			number = new PhoneNumber(textNew.substring(0, 3),
					textNew.substring(3, 7), textNew.substring(7, 11));
		}
		setValue(number);
	}

	private String removeNonNumbers(String text) {
		StringBuffer str = new StringBuffer();
		for (int i = 0; i < text.length(); i++) {
			if (Character.isDigit(text.charAt(i))) {
				str.append(text.charAt(i));
			}
		}
		return str.toString();
	}
}
