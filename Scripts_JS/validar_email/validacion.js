function validarEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(email);
}

function validacion() {
	$("#result").text("");
	var emailaddress = $("#email").val();
	if (validarEmail(emailaddress)) {
		$("#result").text(emailaddress + " es valida :)");
		$("#result").css("color", "green");
	} else {
		$("#result").text(emailaddress + " no es correcto (");
		$("#result").css("color", "red");
	}
return false;
}

$("#validate").bind("click", validate);