function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelectorAll(".close-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", launchModal));

// close modal event
closeBtn.forEach(btn => btn.addEventListener("click", closeModal));

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// close modal form
function closeModal() {
	modalbg.style.display = "none";
}

// checks before submit
function validate(event) {

	// Prevent Form to validate
	event.preventDefault();

	// Empty error count
	let errorForm = 0;
	// Empty error content
	const errorAlerts = ["first-error", "last-error","email-error","quantity-error","location-error","check-error"];

	errorAlerts.forEach(function (item) {
		document.getElementById(item).textContent = "";
	});

	const minFirst = 2;
	const minLast = 2;



	// Check prenom
	let checkFirst = document.getElementById("first").value;

	if (checkFirst.length < minFirst) {
		let firstErrorMessage =
			"Le champs prénom ne contient pas au moins " + minFirst + " caractères";
		document.getElementById("first-error").textContent = firstErrorMessage;
		errorForm++;
	}

	// Check nom
	let checkLast = document.getElementById("last").value;

	if (checkLast.length < minLast) {
		let lastErrorMessage =
			"Le champs nom ne contient pas au moins " + minLast + " caractères";
		document.getElementById("last-error").textContent = lastErrorMessage;
		errorForm++;
	}

	// Check mail
	let checkEmail = document.getElementById("email").value;

	const regularExpressionEmailCheck =
		/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

	if (!regularExpressionEmailCheck.test(checkEmail)) {
		let EmailErrorMessage = "Le champs email est de forme invalide";
		document.getElementById("email-error").textContent = EmailErrorMessage;
		errorForm++;
	}

	// Check quantity
	let checkQuantity = document.getElementById("quantity").value;

	if (checkQuantity=="" || (isNaN(checkQuantity))) {
		let QuantityErrorMessage = "Le champs quantité doit être un nombre";
		document.getElementById("quantity-error").textContent = QuantityErrorMessage;
		errorForm++;
	}

	// Check location
	let checkLocation = document.getElementsByName("location");
	let radiochecked = 0;

	for (let radio of checkLocation) {
		if (radio.checked) {
			radiochecked++;
		}
	}
	if (radiochecked < 1) {
		let LocationErrorMessage = "Le champs location doit être coché";
		document.getElementById("location-error").textContent = LocationErrorMessage;
		errorForm++;
	}

  // Check general conditions

  let checkCheckbox = document.getElementById("checkbox1");

	if (checkCheckbox.checked==false) {
		let CheckErrorMessage = "Vous devez accepter les conditions générales";
		document.getElementById("check-error").textContent = CheckErrorMessage;
		errorForm++;
	}

	// Check if error to submit .. or not
	if (errorForm == 0) {
    let ValidationMessage = "Merci ! Votre réservation a été reçue.";
		document.getElementById("validation-message").textContent = ValidationMessage;
		//document.getElementById('theForm').submit();
	} else {
		return false;
	}
}
