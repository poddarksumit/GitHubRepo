<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<script type="text/javascript" src="/lndbox/media/javascript/jquery-1.8.3.min.js"></script>
<script type="text/javascript">
	$(document).ready(function(e){
		$('input[name="orderIdCheckbox"]').change(function(e){
			if($(this).is(':checked')){
				$(this).parents('tr').addClass('selectedorder');
			}else{
				$(this).parents('tr').removeClass('selectedorder');
			}
		});
		$('select[id="orderprocessselect"]').change(function(e){
			var orderId = $(this).parents('tr').attr("order-id");
			if($(this).attr("minValue") >= $(this).val()){
				$(this).addClass("select-error");
				 $(this).parents('tr').find('li[id="errormsg"]').show();
			}else {
				$(this).removeClass("select-error");
				$(this).parents('tr').find('li[id="errormsg"]').hide();
				$(this).parents('tr').find('input[id="orderIdCheckbox"]').prop("checked","true");
				$(this).parents('tr').find('input[id="orderIdCheckbox"]').trigger('change');
			}
		});
		$('#orderDetailsViewSlot').click(function(e){
			e.preventDefault();
			$('html, body').animate({ scrollDown: .offset().top }, 'slow');
		});
	});
</script>
<style type="text/css">
	.nonactiveorder {display: none;}
	.selectedorder {background-color: aliceblue;}
	span {font-style: normal;font-size: 10px; color: red;font-family:"Times New Roman",Times,serif;}
	ul {padding: 0px;margin: 0px;}
	li {list-style: none }
	td {text-align: center; padding: 5px 5px;}
	.select-error {border: 1px red solid;}
</style>
</head>
<body>
Set the path : <input type="text" name="location"/> <input type="file" name="file" value="Browse"></input>
<div style="padding: 5px;">
	<h5>Your order not listed. <a href="#">Please refine your search criteria</a></h5>
</div>
<div id="orderLists" style="height: 385px;overflow-y: scroll;  border: 1px black solid;">
	<table id="orderDetailsDiv" border="1">
		<tr>
			<td></td>
			<td>Order Id</td>
			<td class="orderSourceNumber">Order Source Number</td>
			<td>Order Placed Date</td>
			<td>Order Type</td>
			<td>Order Status Cd</td>
			<td>Customer First Name</td>
			<td>Customer Last Name</td>
			<td>Customer Email Address</td>
			<td>View Details</td>
			<td>Processor To Run</td>
		</tr>
		<tr order-id="123456">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox"  name="orderIdCheckbox"/></td>
			<td id="orderId">123456</td>
			<td id="orderNo" class="orderSourceNumber">3214</td>
			<td id="orderDate">21-Feb-2013</td>
			<td id="orderType">ORD</td>
			<td id="orderStatus">S</td>
			<td id="orderCustFNm">Sumit</td>
			<td id="orderCustLNm">Poddar</td>
			<td id="orderEmail">spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="1" class="" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
			
		</tr>
		<tr order-id="123446556">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox"   name="orderIdCheckbox"/></td>
			<td>123446556</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>S</td>
			<td>Manish</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="2" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		<tr order-id="1234465561">
			<td id="orderIdCheckBx"><input type="checkbox" id="orderIdCheckbox" name="orderIdCheckbox"/></td>
			<td>1234465561</td>
			<td>32146494</td>
			<td>21-Feb-2013</td>
			<td>ORD</td>
			<td>1</td>
			<td>Manish poddaar</td>
			<td>Kumar</td>
			<td>spoddar@wool.com.au</td>
			<td>
				<button id="orderDetailsViewSlot">Details</button>
			</td>
			<td>
				<ul>
					<li>
						<select name="" minValue="0" id="orderprocessselect">
							<option value="20">Select Process</option>
							<option value="0">Security Release (1)</option>
							<option value="1">Payment Processor (M)</option>
							<option value="2">Order Export (P)</option>
						</select>
					</li>
					<li style="display: none;" id="errormsg">
						<span class="status">
							Order has passed the process selected.
						</span>
					</li>
				</ul>
			</td>
		</tr>
		
	</table>
</div>
<div id="orderDetails" style="border-top: 2px gray solid;">
	<%@ include file="/include/order_details.jsp" %>
	<input type="text" name="focus" id="orderDetailsFocus"/>
</div>
</body>
</html>