// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close-btn");
const closeBtnSuccess = document.querySelector(".close-btn-success");
const formData = document.querySelector(".formData");
const formDomSubmit = document.querySelector(".btn-submit");
const quantityInput = document.getElementById("quantity");
const formZone = document.getElementById("theForm");
const validationMessage = document.getElementById("validationMessage");
const validationMessageZone = document.getElementById("validationMessageZone");

// Fix error Variables
const minFirst = 2;
const minLast = 2;
const checkById = [];

// Empty error content
const errorAlerts = {
	first: [
		"Le prénom contient des chiffres ou compte moins de " + minFirst + " lettres",
		checkFirst,
	],
	last: [
		"Le nom contient des chiffres ou compte moins de " + minLast + " lettres",
		checkLast,
	],
	email: ["L'email est de forme invalide", checkEmail],
	birthdate: ["La date de naissance est invalide", checkBirthdate],
	quantity: ["Le champs quantité doit être un nombre positif", checkQuantity],
	location1: ["Le champs location doit être coché", checkLocation1],
	checkbox1: ["Vous devez accepter les conditions générales", checkCheckbox1],
};

let errorDataInput;

// Boucle
for (let errorMessageKey in errorAlerts) {
	// Get Elements By ID;
	checkById[errorMessageKey] = document.getElementById(errorMessageKey);
	errorDataInput = document.getElementById(errorMessageKey).closest(".formData");
	errorDataInput.setAttribute("data-error", errorAlerts[errorMessageKey][0]);

	if (errorAlerts[errorMessageKey][1]) {
		// Input Listener
		checkById[errorMessageKey].addEventListener(
			"change",
			errorAlerts[errorMessageKey][1]
		);
		console.log("Ecouteur " + errorMessageKey + " acitf");
	}
}

// launch modal event
modalBtn.forEach(item => item.addEventListener("click", launchModal));

// close modal event
closeBtn.addEventListener("click", closeModal);

// quantity input negative check live
quantityInput.addEventListener("change", checkNegative);

// sumbit form
formDomSubmit.addEventListener("click", validate);

// close success
closeBtnSuccess.addEventListener("click", closeSuccess);

// close success
navBtn.addEventListener("click", editNav);

// edit nav
function editNav() {
	const x = document.getElementById("myTopnav");
	if (x.className === "topnav") {
		x.className += " responsive";
	} else {
		x.className = "topnav";
	}
}

// launch modal form
function launchModal() {
	modalbg.style.display = "block";
}

// close modal form
function closeModal() {
	modalbg.style.display = "none";
}

function checkNegative() {
	if (quantityInput.value != "" && !isNaN(quantityInput.value)) {
		if (quantityInput.value <= 0) {
			alert(errorAlerts["quantity"][0]);
			quantityInput.value = 0;
		}
	}
}

// Messages
const ValidationMessageText = "Merci ! Votre réservation a été reçue.";

// close modal form
function closeSuccess() {
	modalbg.style.display = "none";
	theForm.style.display = "block";
	validationMessage.style.display = "none";
	validationMessage.classList.add("success_visible");
}

validationMessageZone.textContent = ValidationMessageText;

// Check variables
let inputToTest;

// Empty error count
let errorForm = 0;

// Function with value
function setErrorInput(inputToSet, field) {
	inputToSet.setAttribute("data-error-visible", "true");
	errorForm++;
}

// Function with value
function hideErrorInput(inputToSet, field) {
	inputToSet.setAttribute("data-error-visible", "false");
}

// Check if only letters
const expLetters = new RegExp(/\d+/g);

function onlyLetters(stringTotest) {
	//	console.log("test: " + stringTotest + " : " + expLetters.test(stringTotest))
	let testVarNumber = expLetters.test(stringTotest);
	return testVarNumber;
}

// Firstname validation
function checkFirst() {
	hideErrorInput(checkById["first"].closest(".formData"), "first");
	if (
		checkById["first"].value.length < minFirst ||
		onlyLetters(checkById["first"].value)
	) {
		//console.log("test2");
		setErrorInput(checkById["first"].closest(".formData"), "first");
	}
}

// Lastname validation
function checkLast() {
	hideErrorInput(checkById["last"].closest(".formData"), "last");
	if (
		checkById["last"].value.length < minFirst ||
		onlyLetters(checkById["last"].value)
	) {
		//console.log("test2");
		setErrorInput(checkById["last"].closest(".formData"), "last");
	}
}

// Email validation
const regularExpressionEmailCheck =
	/^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

function checkEmail() {
	hideErrorInput(checkById["email"].closest(".formData"), "email");
	if (!regularExpressionEmailCheck.test(checkById["email"].value)) {
		setErrorInput(checkById["email"].closest(".formData"), "email");
	}
}

// Check Birthdate
function checkBirthdate() {
	hideErrorInput(checkById["birthdate"].closest(".formData"), "birthdate");

	let dateObj = new Date(checkById["birthdate"].value);
	let dateObjJour = Date.now();

	if (
		checkById["birthdate"].value == "" ||
		isNaN(dateObj) ||
		dateObj > dateObjJour
	) {
		setErrorInput(checkById["birthdate"].closest(".formData"), "birthdate");
	}
}

// Check quantity
function checkQuantity() {
	hideErrorInput(checkById["quantity"].closest(".formData"), "quantity");
	if (checkById["quantity"].value == "" || isNaN(checkById["quantity"].value)) {
		setErrorInput(checkById["quantity"].closest(".formData"), "quantity");
	}
}

// Check location
function checkLocation1() {
	hideErrorInput(checkById["location1"].closest(".formData"), "location");
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
}

// Check checkbox1
function checkCheckbox1() {
	hideErrorInput(checkById["checkbox1"].closest(".formData"), "checkbox");
	if (checkById["checkbox1"].checked == false) {
		setErrorInput(checkById["checkbox1"].closest(".formData"), "checkbox");
	}
}

// checks before submit
function validate(event) {
	// Prevent Form to validate
	event.preventDefault();

	errorForm = 0;

	let errorDataInput;

	// Boucle error messages
	for (let errorMessageKey in errorAlerts) {
		// Get Elements By ID;
		checkById[errorMessageKey] = document.getElementById(errorMessageKey);
		errorDataInput = document.getElementById(errorMessageKey).closest(".formData");
		errorDataInput.setAttribute("data-error-visible", "false");
	}

	// Check firstName
	checkFirst();

	// Check lastName
	checkLast();

	// Check mail
	checkEmail();

	// Check birthDate
	checkBirthdate();

	// Check quantity
	checkQuantity();

	// Check Location1
	checkLocation1();

	// Check general conditions
	checkCheckbox1();

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
