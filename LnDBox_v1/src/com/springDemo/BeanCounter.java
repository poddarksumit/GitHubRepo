/**
 * 
 */
package com.springDemo;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;

/**
 * This class is used to
 * 
 * @author Sumit 10-Nov-2013
 * 
 */
public class BeanCounter implements BeanFactoryPostProcessor {

	/*
	 * (non-Javadoc)
	 * 
	 * @see org.springframework.beans.factory.config.BeanFactoryPostProcessor#
	 * postProcessBeanFactory
	 * (org.springframework.beans.factory.config.ConfigurableListableBeanFactory
	 * )
	 */
	@Override
	public void postProcessBeanFactory(ConfigurableListableBeanFactory arg0)
			throws BeansException {
		System.out.println("Initialization is starting shortly");
		System.out.println("-----------------------------------------");
		System.out.println(arg0.getBeanDefinitionCount());
	}

}
