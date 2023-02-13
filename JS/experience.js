const fName = document.querySelector(".f-name");
const fSurname = document.querySelector(".f-surname");
const fEmail = document.querySelector(".f-email");
const fAboutInput = document.querySelector(".about-me-full");
const fMobileInput = document.querySelector(".f-mobile-num");
const uploadedPhoto = document.querySelector(".uploaded-image");
const addExperience = document.querySelector(".add-experience-text");
const nextBtn = document.querySelector(".next");
const form = document.querySelector(".forms");
const submit = document.querySelector(".submit");
const experienceSection = document.querySelector(".experience-section");
const backVector = document.querySelector(".backVector");

let fDate = [...document.querySelectorAll(".f-date")];
let fPosition = [...document.querySelectorAll(".f-position")];
let fEmployer = [...document.querySelectorAll(".f-employer")];
let fAbout = [...document.querySelectorAll(".f-about-experience-text")];

let aboutExperiences = [
  ...document.querySelectorAll(".about-experience-input"),
];
let startDates = [...document.querySelectorAll(".start-date-input")];
let endDates = [...document.querySelectorAll(".end-date-input")];

let errors = [...document.querySelectorAll(".error-icon")];
let corrects = [...document.querySelectorAll(".correct-icon")];

let positionHeaders = [...document.querySelectorAll(".position-text")];
let positionInputs = [...document.querySelectorAll(".position-input")];

let employHeaders = [...document.querySelectorAll(".employer-text")];
let employInputs = [...document.querySelectorAll(".employer-input")];

let positions = [...document.querySelectorAll(".position")];
let employers = [...document.querySelectorAll(".employer")];
let starts = [...document.querySelectorAll(".start-date")];
let ends = [...document.querySelectorAll(".end-date")];

//functions
function addError(inputEl, inputHeader, index) {
  errors[index].classList.add("active");
  inputEl.classList.add("error");
  inputEl.style.borderColor = "red";
  inputHeader.style.color = "red";
  corrects[index].classList.remove("active");
  inputEl.classList.remove("correct");
}
function addCorrect(inputEl, inputHeader, index) {
  errors[index].classList.remove("active");
  inputEl.classList.remove("error");
  inputHeader.style.color = null;
  inputEl.style.borderColor = "green";
  corrects[index].classList.add("active");
  inputEl.classList.add("correct");
}

function positionCheck(index) {
  let value = positionInputs[index].value;
  if (value.length < 2) {
    addError(positionInputs[index], positionHeaders[index], 2 * index);
  } else {
    addCorrect(positionInputs[index], positionHeaders[index], 2 * index);

    let positions = JSON.parse(localStorage.getItem("positions"));

    !positions ? (positions = []) : null;

    positions[index] = value;

    localStorage.setItem("positions", JSON.stringify(positions));
    fPosition[index].textContent = positions[index];
  }
}
function employerCheck(index) {
  let value = employInputs[index].value;
  if (value.length < 2) {
    addError(employInputs[index], employHeaders[index], 2 * index + 1);
  } else {
    addCorrect(employInputs[index], employHeaders[index], 2 * index + 1);

    let employs = JSON.parse(localStorage.getItem("employs"));

    !employs ? (employs = []) : null;

    employs[index] = value;

    localStorage.setItem("employs", JSON.stringify(employs));
    fEmployer[index].textContent = employs[index];
  }
}

function reload() {
  positionInputs.forEach((input, index) => {
    input.addEventListener("blur", () => positionCheck(index));
  });
  employInputs.forEach((input, index) => {
    input.addEventListener("blur", () => employerCheck(index));
  });

  startDates.forEach((input, index) => {
    input.addEventListener("blur", () => {
      if (input.value !== "") {
        input.style.borderColor = "green";

        let dates = JSON.parse(localStorage.getItem("startDates"));

        !dates ? (dates = []) : null;

        dates[index] = input.value;

        localStorage.setItem("startDates", JSON.stringify(dates));
      } else {
        input.style.borderColor = "red";
      }
    });
  });

  endDates.forEach((input, index) => {
    input.addEventListener("blur", () => {
      if (input.value !== "") {
        input.style.borderColor = "green";

        let dates = JSON.parse(localStorage.getItem("endDates"));
        !dates ? (dates = []) : null;
        dates[index] = input.value;
        localStorage.setItem("endDates", JSON.stringify(dates));
      } else {
        input.style.borderColor = "red";
      }
    });
  });
  localStorage.getItem("abouts")
    ? null
    : localStorage.setItem("abouts", JSON.stringify([""]));

  aboutExperiences.forEach((input, index) => {
    input.addEventListener("blur", () => {
      if (input.value !== "") {
        input.style.borderColor = "green";
        let abouts = JSON.parse(localStorage.getItem("abouts"));

        !abouts ? (abouts = []) : null;

        abouts[index] = input.value;

        localStorage.setItem("abouts", JSON.stringify(abouts));
        fAbout[index].textContent = abouts[index];
      }
    });
  });

  startsLocale
    ? fDate.forEach((el, index) => {
        el.textContent = `${startsLocale[index]} - ${
          endsLocale ? endsLocale[index] : ""
        }`;
        startDates[index].value = startsLocale ? startsLocale[index] : null;
        endDates[index].value = endsLocale ? endsLocale[index] : null;
      })
    : null;

  positionsLocale
    ? fPosition.forEach((el, index) => {
        el.textContent = `${positionsLocale[index]}`;
        positionsLocale[index]
          ? (positionInputs[index].value = positionsLocale[index])
          : null;
        positionsLocale[index]
          ? (positionInputs[index].style.borderColor = "green") &&
            corrects[2 * index].classList.add("active")
          : null;
      })
    : null;
  employsLocale
    ? fEmployer.forEach((el, index) => {
        el.textContent = `${employsLocale[index]}`;
        employsLocale[index]
          ? (employInputs[index].value = employsLocale[index])
          : null;
        employsLocale[index]
          ? (employInputs[index].style.borderColor = "green") &&
            corrects[2 * index + 1].classList.add("active")
          : null;
      })
    : null;
  aboutsLocale
    ? fAbout.forEach((el, index) => {
        el.textContent = `${aboutsLocale[index]}`;
        aboutsLocale[index]
          ? (aboutExperiences[index].value = aboutsLocale[index])
          : null;
      })
    : null;
}

//
fEmail.textContent = localStorage.getItem("email");
fName.textContent = localStorage.getItem("name");
fSurname.textContent = localStorage.getItem("surname");
fAboutInput.textContent = localStorage.getItem("aboutMe");
fMobileInput.textContent = localStorage.getItem("mobile");
if (localStorage.getItem("photo")) {
  uploadedPhoto.setAttribute("src", localStorage.getItem("photo"));
} else {
  uploadedPhoto.setAttribute("src", "../icons-images/default.png");
}

let positionsLocale = JSON.parse(localStorage.getItem("positions"));
let employsLocale = JSON.parse(localStorage.getItem("employs"));
let aboutsLocale = JSON.parse(localStorage.getItem("abouts"));
let startsLocale = JSON.parse(localStorage.getItem("startDates"));
let endsLocale = JSON.parse(localStorage.getItem("endDates"));

reload();

nextBtn.addEventListener("click", () => {
  let valid = true;
  [...corrects].slice(0, 2).forEach((correct, index) => {
    if (!correct.classList.contains("active")) {
      errors[index].classList.add("active");
      valid = false;
    }
  });
  if (startDates[0].value === "") valid = false;
  if (endDates[0].value === "") valid = false;
  if (valid) {
    window.location.href = "../html/education.html";
  }
  //   submit.click();
});

addExperience.addEventListener("click", () => {
  let html = `<div class="form">
    <div class="position">
      <p class="position-text">თანამდებობა</p>
      <input
        style="padding-left: 16px"
        placeholder="დეველოპერი, დიზაინერი, ა.შ."
        class="position-input"
        type="text"
      /><img
        class="correct-icon"
        src="/icons-images/correct.svg"
        alt="correct icon"
      />
      <img src="/icons-images/error.svg" class="error-icon" />

      <p class="position-hint">მინიმუმ 2 სიმბოლო</p>
    </div>
    <div class="employer">
      <p class="employer-text">დამსაქმებელი</p>
      <input
        style="padding-left: 16px"
        placeholder="დამსაქმებელი<"
        class="employer-input"
        type="text"
      />
      <img
        class="correct-icon"
        src="/icons-images/correct.svg"
        alt="correct icon"
      />
      <img src="/icons-images/error.svg" class="error-icon" />
      <p class="employer-hint">მინიმუმ 2 სიმბოლო</p>
    </div>
    <div class="start-date">
      <p class="start-date-text">დაწყების რიცხვი</p>
      <input class="start-date-input" type="date" required />
    </div>
    <div class="end-date">
      <p class="end-date-text">დამთავრების რიცხვი</p>
      <input class="end-date-input" type="date" required />
    </div>
    <div class="about-experience">
      <p class="about-experience-text">აღწერა</p>
      <input
        style="padding-bottom: 85px; padding-left: 16px"
        placeholder="როლი თანამდებობაზე და ზოგადი აღწერა"
        class="about-experience-input"
        type="text"
      />
    </div>
    <hr class="experience-line" />
  </div>`;

  let newExp = `<div class="experience-div">
<hr class="line-experience-second" />
<p class="f-experience">გამოცდილება</p>
<p class="f-position"></p>
<p class="f-employer"></p>
<p class="f-date"></p>
<p class="f-about-experience-text">
  
</p>
</div>`;

  form.insertAdjacentHTML("afterend", html);

  experienceSection.insertAdjacentHTML("beforeend", newExp);

  aboutExperiences = [...document.querySelectorAll(".about-experience-input")];
  startDates = [...document.querySelectorAll(".start-date-input")];
  endDates = [...document.querySelectorAll(".end-date-input")];

  errors = [...document.querySelectorAll(".error-icon")];
  corrects = [...document.querySelectorAll(".correct-icon")];

  positionHeaders = [...document.querySelectorAll(".position-text")];
  positionInputs = [...document.querySelectorAll(".position-input")];

  employHeaders = [...document.querySelectorAll(".employer-text")];
  employInputs = [...document.querySelectorAll(".employer-input")];

  positions = [...document.querySelectorAll(".position")];
  employers = [...document.querySelectorAll(".employer")];
  starts = [...document.querySelectorAll(".start-date")];
  ends = [...document.querySelectorAll(".end-date")];

  fDate = [...document.querySelectorAll(".f-date")];
  fPosition = [...document.querySelectorAll(".f-position")];
  fEmployer = [...document.querySelectorAll(".f-employer")];
  fAbout = [...document.querySelectorAll(".f-about-experience-text")];
  reload();
});
backVector.addEventListener("click", () => {
  localStorage.clear();
});
