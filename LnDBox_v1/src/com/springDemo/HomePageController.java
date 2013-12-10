/**
 * 
 */
package com.springDemo;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.AbstractController;

/**
 * This class is used to
 * 
 * @author Sumit 19-Nov-2013
 * 
 */
@Controller
public class HomePageController extends AbstractController {
	public HomePageController() {

	}

	//Student student = new Student();

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.web.servlet.mvc.AbstractController#handleRequestInternal
	 * (javax.servlet.http.HttpServletRequest,
	 * javax.servlet.http.HttpServletResponse)
	 */
	@Override
	protected ModelAndView handleRequestInternal(HttpServletRequest arg0,
			HttpServletResponse arg1) throws Exception {
		ModelAndView model = new ModelAndView("index");
		model.addObject("msg", "hello world. i am back and this is your favorite Smatty - Samz");
		return model;
	}

	/*
	 * public Student getStudent() { return student; }
	 * 
	 * public void setStudent(Student student) { this.student = student; }
	 */

}
