<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Home Page</title>
</head>
<body>
<%
//http://stackoverflow.com/questions/3737635/how-to-access-a-modelandview-object-within-the-jsp-page
//http://forum.spring.io/forum/spring-projects/web/37764-access-a-spring-bean-with-scriptlet-instead-of-jstl
%>

Student Details as below :
<br/>
Name : Sumit POddar -
 ${message} + ${std}
<% String str = (String)request.getAttribute("std");%>
<h5>H5 : <%= str%></h5>
<% String str1 = (String)request.getParameter("std");%>
<h3>H3 : <%= str%></h3>
<h6>Thanks a lot :)</h6>
</body>
</html>