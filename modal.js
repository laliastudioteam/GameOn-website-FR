function editNav() {
	var x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

console.log("start code");

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelector(".modal-btn");
const closeBtn = document.querySelector(".close-btn");
const closeBtnSuccess = document.querySelector(".close-btn-success");
const formData = document.querySelector(".formData");
const formDomSubmit = document.querySelector(".btn-submit");

const formZone = document.getElementById("theForm");
const validationMessage = document.getElementById("validationMessage");
const validationMessageZone = document.getElementById("validationMessageZone");
console.log("Message zone initialisé");

// launch modal event
modalBtn.addEventListener("click", launchModal);

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal event
closeBtnSuccess.addEventListener("click", closeSuccess);

// sumbit form
formDomSubmit.addEventListener("click", validate);

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// close modal form
function closeModal() {
	modalbg.style.display = "none";
}

// Messages
const ValidationMessage = "Merci ! Votre réservation a été reçue.";

// close modal form
function closeSuccess() {
	modalbg.style.display = "none";
	theForm.style.display = "block";
	validationMessage.style.display = "none";
	validationMessage.classList.add("success_visible");
}

console.log("test de validation chargé :" + ValidationMessage);
validationMessageZone.textContent = ValidationMessage;

// checks before submit
function validate(event) {
	// Prevent Form to validate
	event.preventDefault();

	// Empty error count
	let errorForm = 0;

	// Fix error Variables
	const minFirst = 2;
	const minLast = 2;
	const checkById = [];

	// Empty error content
	const errorAlerts = [
		[
			"first",
			"Le champs prénom ne contient pas au moins " + minFirst + " caractères",
		],
		["last", "Le champs nom ne contient pas au moins " + minLast + " caractères"],
		["email", "Le champs email est de forme invalide"],
		["birthdate", "La date de naissance est invalide"],
		["quantity", "Le champs quantité doit être un nombre"],
		["location1", "Le champs location doit être coché"],
		["checkbox1", "Vous devez accepter les conditions générales"],
	];

	let errorDataInput;

	// Boucle
	errorAlerts.forEach(function (item) {
		// Get Elements By ID;

		checkById[item[0]] = document.getElementById(item[0]);

		errorDataInput = document.getElementById(item[0]).closest(".formData");
		errorDataInput.setAttribute("data-error", item[1]);
		errorDataInput.setAttribute("data-error-visible", "false");
		console.log("Checking : " + item[0] + " set to '" + item[1] + "'");
	});

	// Check variables
	let inputToTest;

	// Function with value
	function setErrorInput(inputToSet, field) {
		inputToSet.setAttribute("data-error-visible", "true");
		errorForm++;
		console.log(field + " field error data text set to visible");
	}

	// Check prenom

	if (checkById["first"].value.length < minFirst) {
		setErrorInput(checkById["first"].closest(".formData"), "first");
	}

	// Check nom

	if (checkById["last"].value.length < minLast) {
		setErrorInput(checkById["last"].closest(".formData"), "last");
	}

	// Check mail

	const regularExpressionEmailCheck =
		/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

	if (!regularExpressionEmailCheck.test(checkById["email"].value)) {
		setErrorInput(checkById["email"].closest(".formData"), "email");
	}

	// Check Birthdate

	let dateObj = new Date(checkById["birthdate"].value);

	if (checkById["birthdate"].value == "" || isNaN(dateObj)) {
		setErrorInput(checkById["birthdate"].closest(".formData"), "birthdate");
	}

	// Check quantity

	if (checkById["quantity"].value == "" || isNaN(checkById["quantity"].value)) {
		setErrorInput(checkById["quantity"].closest(".formData"), "quantity");
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
		setErrorInput(checkById["location1"].closest(".formData"), "location");
	}

	// Check general conditions

	if (checkById["checkbox1"].checked == false) {
		setErrorInput(checkById["checkbox1"].closest(".formData"), "checkbox");
	}

	// Check if error to submit .. or not
	if (errorForm == 0) {
		theForm.style.display = "none";
		validationMessage.style.display = "block";
		validationMessage.classList.add("success_visible");
		//document.getElementById('theForm').submit();
	} else {
		return false;
	}
}