//query selectors
const nameInput = document.querySelector(".inputname");
const surnameInput = document.querySelector(".inputsurname");
const nameHeader = document.querySelector(".name-header");
const surnameHeader = document.querySelector(".surname-header");
const errors = document.querySelectorAll(".error-icon");
const corrects = document.querySelectorAll(".correct-icon");
const fName = document.querySelector(".f-name");
const fSurname = document.querySelector(".f-surname");
const uploadedPhoto = document.querySelector(".uploaded-image");
const photoInput = document.querySelector(".fileInput");
const emailText = document.querySelector(".email-text");
const emailInput = document.querySelector(".email-input");
const fEmail = document.querySelector(".f-email");
const aboutInput = document.querySelector(".about-input");
const fAboutInput = document.querySelector(".about-me-full");
const mobileInput = document.querySelector(".mobile-input");
const fMobileInput = document.querySelector(".f-mobile-num");
const mobileText = document.querySelector(".mobile-text");
const form = document.querySelector(".form");
const backVector = document.querySelector(".backVector");

//functions
function addError(index, inputEl, inputHeader) {
  errors[index].classList.add("active");
  inputEl.classList.add("error");
  inputHeader.style.color = "red";
  corrects[index].classList.remove("active");
  inputEl.classList.remove("correct");
}
function addCorrect(index, inputEl, inputHeader) {
  errors[index].classList.remove("active");
  inputEl.classList.remove("error");
  inputHeader.style.color = null;
  corrects[index].classList.add("active");
  inputEl.classList.add("correct");
}

function checkName() {
  let value = nameInput.value;
  if (value.length <= 2 || !/^[ა-ჰ]+$/.test(value)) {
    addError(0, nameInput, nameHeader);
  } else {
    addCorrect(0, nameInput, nameHeader);
    localStorage.setItem("name", value);
    fName.textContent = localStorage.getItem("name");
  }
}
function checkSurname() {
  let value = surnameInput.value;
  if (value.length <= 2 || !/^[ა-ჰ]+$/.test(value)) {
    addError(1, surnameInput, surnameHeader);
  } else {
    addCorrect(1, surnameInput, surnameHeader);
    localStorage.setItem("surname", value);
    fSurname.textContent = localStorage.getItem("surname");
  }
}
function checkEmail() {
  let value = emailInput.value;
  if (
    !value.endsWith("@redberry.ge") ||
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  ) {
    addError(2, emailInput, emailText);
  } else {
    addCorrect(2, emailInput, emailText);
    localStorage.setItem("email", value);
    fEmail.textContent = localStorage.getItem("email");
  }
}

function readURL(e) {
  const image = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(image);

  reader.addEventListener("load", () => {
    localStorage.setItem("photo", reader.result);
    uploadedPhoto.setAttribute("src", reader.result);
  });
}

localStorage.getItem("aboutMe") ? null : localStorage.setItem("aboutMe", "");
function saveInfo(e) {
  let value = e.target.value;
  localStorage.setItem("aboutMe", value);
  fAboutInput.textContent = localStorage.getItem("aboutMe");
}

function checkMobile() {
  let value = mobileInput.value;
  if (!/^(\+?995)?(79\d{7}|5\d{8})$/.test(value)) {
    addError(3, mobileInput, mobileText);
  } else {
    addCorrect(3, mobileInput, mobileText);
    localStorage.setItem("mobile", `+${value}`);
    fMobileInput.textContent = localStorage.getItem("mobile");
  }
}

function submitForm(e) {
  e.preventDefault();
  let valid = true;
  [...corrects].forEach((correct, index) => {
    if (!correct.classList.contains("active")) {
      errors[index].classList.add("active");
      valid = false;
    }
  });
  if (valid) {
    window.location.href = "../html/experience.html";
  }
}

// add event liseners
nameInput.addEventListener("blur", checkName);
surnameInput.addEventListener("blur", checkSurname);
emailInput.addEventListener("blur", checkEmail);
photoInput.addEventListener("change", readURL);
aboutInput.addEventListener("blur", saveInfo);
mobileInput.addEventListener("blur", checkMobile);
form.addEventListener("submit", submitForm);
backVector.addEventListener("click", () => {
  localStorage.clear();
});
// set inputs values and upload photo
nameInput.value = localStorage.getItem("name");
surnameInput.value = localStorage.getItem("surname");
fEmail.textContent = localStorage.getItem("email");
fName.textContent = localStorage.getItem("name");
fSurname.textContent = localStorage.getItem("surname");
fAboutInput.textContent = localStorage.getItem("aboutMe");
fMobileInput.textContent = localStorage.getItem("mobile");
aboutInput.value = localStorage.getItem("aboutMe");
mobileInput.value = localStorage.getItem("mobile")?.slice(1) || null;
emailInput.value = localStorage.getItem("email");

if (localStorage.getItem("photo")) {
  uploadedPhoto.setAttribute("src", localStorage.getItem("photo"));
  photoInput.removeAttribute("required");
} else {
  uploadedPhoto.setAttribute("src", "../icons-images/default.png");
}

//check values afretrefresh
localStorage.getItem("name") ? checkName() : null;
localStorage.getItem("surname") ? checkSurname() : null;
localStorage.getItem("email") ? checkEmail() : null;
localStorage.getItem("mobile") ? checkMobile() : null;
