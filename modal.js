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

	// Fix error Variables
	const minFirst = 2;
	const minLast = 2;

	// Empty error content
	const errorAlerts = [
		[
			"first",
			"Le champs prénom ne contient pas au moins " + minFirst + " caractères",
		],
		["last", "Le champs nom ne contient pas au moins " + minLast + " caractères"],
		["email", "Le champs email est de forme invalide"],
		["quantity", "Le champs quantité doit être un nombre"],
		["location1", "Le champs location doit être coché"],
		["checkbox1", "Vous devez accepter les conditions générales"],
	];
	let errorDataInput;

	// Boucle
	errorAlerts.forEach(function (item) {
	

		errorDataInput = document.getElementById(item[0]).closest(".formData");
		errorDataInput.setAttribute("data-error", item[1]);
		errorDataInput.setAttribute("data-error-visible", "false");
		console.log("Checking : " + item[0] + " set to '" + item[1] + "'");
	});

	// Check variables
	let inputToSet;
	let inputToTest;

	// Function with value
	function setErrorInput(inputToSet, field) {
		inputToSet.setAttribute("data-error-visible", "true");
		errorForm++;
		console.log("Field : " + field + " error set to visible");
	}

	// Check prenom
	inputToTest="first";
	let checkFirst = document.getElementById(inputToTest);

	if (checkFirst.value.length < minFirst) {
		setErrorInput(checkFirst.closest(".formData"), inputToTest);
	}

	// Check nom
	inputToTest="last";
	let checkLast = document.getElementById(inputToTest);

	if (checkLast.value.length < minLast) {
		setErrorInput(checkLast.closest(".formData"), inputToTest);
	}

	// Check mail
	inputToTest="email";
	let checkEmail = document.getElementById(inputToTest)

	const regularExpressionEmailCheck =
		/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

	if (!regularExpressionEmailCheck.test(checkEmail.value)) {
		setErrorInput(checkEmail.closest(".formData"), inputToTest);
	}

	// Check quantity
	inputToTest="quantity";
	let checkQuantity = document.getElementById(inputToTest);


	if (checkQuantity.value == "" || isNaN(checkQuantity.value)) {
		setErrorInput(checkQuantity.closest(".formData"), inputToTest);
	}

	// Check location
	inputToTest="location1";
	let checkLocation = document.getElementsByName("location");
	let checkLocationId = document.getElementById("location1", inputToTest);
	let radiochecked = 0;

	for (let radio of checkLocation) {
		if (radio.checked) {
			radiochecked++;
		}
	}
	if (radiochecked < 1) {
		setErrorInput(checkLocationId.closest(".formData"), inputToTest);
	}

	// Check general conditions
	inputToTest="checkbox1";
	let checkCheckbox = document.getElementById(inputToTest);

	if (checkCheckbox.checked == false) {
		setErrorInput(checkCheckbox.closest(".formData"), inputToTest);
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
