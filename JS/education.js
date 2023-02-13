const fEducationUni = document.querySelector(".f-education-uni");
const fEducationDegree = document.querySelector(".f-education-degree");
const fEducationDate = document.querySelector(".f-education-date");
const fEducationAbout = document.querySelector(".f-education-about");
const fPosition = document.querySelector(".f-position");
const fEmploy = document.querySelector(".f-employer");
const fDate = document.querySelector(".f-date");
const fAboutExperience = document.querySelector(".f-about-experience-text");
const ending = document.querySelector(".ending-btn ");
///////////////
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
const aboutInput = document.querySelector(".ed-about-input");
const fAboutInput = document.querySelector(".about-me-full");
const mobileInput = document.querySelector(".mobile-input");
const fMobileInput = document.querySelector(".f-mobile-num");
const mobileText = document.querySelector(".mobile-text");
const form = document.querySelector(".form");
const backVector = document.querySelector(".backVector");

////////////////
let selectMenu = document.querySelector(".selectMenu");
let selectBtn = document.querySelector(".selectBtn");
let selectBtnText = document.querySelector(".selectBtnText");
let optionsParent = document.querySelector(".options");
let options = document.querySelectorAll(".option");
let endDate = document.querySelector(".ed-end-date-input");
let educationInput = document.querySelector(".education-input");
let correct = document.querySelector(".correct-icon");
let error = document.querySelector(".error-icon");
let optionsArr = [];
const edAboutInput = document.querySelector(".ed-about-input");

selectBtn.addEventListener("click", () => {
  optionsParent.classList.toggle("active");
});

REDBERRY_URL = "https://resume.redberryinternship.ge";

options.forEach((select) => {
  select.addEventListener("click", () => {
    selectBtnText.innerText = select.innerText;
    optionsParent.classList.toggle("active");
    selectBtn.style.borderColor = "green";
    let degrees = JSON.parse(localStorage.getItem("degrees"));
    fEducationDegree.textContent = select.innerText;

    !degrees ? (degrees = []) : null;
    degrees[0] = select.innerText;

    localStorage.setItem("degrees", JSON.stringify(degrees));
  });
});

selectBtnText.textContent = localStorage.getItem("degrees")
  ? JSON.parse(localStorage.getItem("degrees"))[0]
  : "აირჩიეთ ხარისხი";
endDate.value = localStorage.getItem("dueDates")
  ? JSON.parse(localStorage.getItem("dueDates"))[0]
  : null;
educationInput.value = localStorage.getItem("educations")
  ? JSON.parse(localStorage.getItem("educations"))[0]
  : null;
aboutInput.value = localStorage.getItem("aboutEducation")
  ? JSON.parse(localStorage.getItem("aboutEducation"))[0]
  : null;

endDate.addEventListener("blur", checkDate);
function checkDate(e) {
  if (e.target.value != "") {
    let dueDates = JSON.parse(localStorage.getItem("dueDates"));
    fEducationDate.textContent = e.target.value;
    !dueDates ? (dueDates = []) : null;
    dueDates[0] = e.target.value;
    e.target.style.borderColor = "green";
    localStorage.setItem("dueDates", JSON.stringify(dueDates));
  } else {
    e.target.style.borderColor = "red";
  }
}

edAboutInput.addEventListener("blur", saveInfo);
function saveInfo(e) {
  if (e.target.value != "") {
    let abouts = JSON.parse(localStorage.getItem("aboutEducation"));
    fEducationAbout.textContent = e.target.value;

    !abouts ? (abouts = []) : null;
    abouts[0] = e.target.value;
    e.target.style.borderColor = "green";
    localStorage.setItem("aboutEducation", JSON.stringify(abouts));
  } else {
    e.target.style.borderColor = "red";
  }
}

educationInput.addEventListener("blur", checkEducation);
function checkEducation(e) {
  if (e.target.value.length < 2) {
    error.classList.add("active");
    correct.classList.remove("active");

    e.target.style.borderColor = "red";
  } else {
    let educations = JSON.parse(localStorage.getItem("dueDates"));
    correct.classList.add("active");
    e.target.style.borderColor = "green";
    error.classList.remove("active");

    !educations ? (educations = []) : null;
    educations[0] = e.target.value;

    localStorage.setItem("educations", JSON.stringify(educations));
  }
}

fetch(`${REDBERRY_URL}/api/degrees`, {
  method: "GET",
})
  .then((response) => {
    response.json().then((data) => {
      optionsArr = data.map((option) => {
        return option.title;
      });
      options.forEach((option, index) => {
        option.textContent = optionsArr[index];
      });
    });
  })

  .catch((error) => {
    console.log("Error:", error);
  });

localStorage.getItem("degrees")
  ? (selectBtn.style.borderColor = "green")
  : null;
localStorage.getItem("dueDates") ? (endDate.style.borderColor = "green") : null;
localStorage.getItem("educations")
  ? (educationInput.style.borderColor = "green")
  : null;

function sendForm() {
  let experiences = [];

  JSON.parse(localStorage.getItem("positions")).map((pos, index) => {
    experiences[index] = { position: pos };
  });
  JSON.parse(localStorage.getItem("employs")).map((emp, index) => {
    experiences[index].employer = emp;
  });
  JSON.parse(localStorage.getItem("startDates")).map((start, index) => {
    experiences[index].start_date = start;
  });
  JSON.parse(localStorage.getItem("endDates")).map((end, index) => {
    experiences[index].due_date = end;
  });

  for (let index = 0; index < experiences.length; index++) {
    let abouts = JSON.parse(localStorage.getItem("abouts"));
    experiences[index].description
      ? (experiences[index].description = abouts[index])
      : (experiences[index].description = "");
  }

  let educations = [];

  JSON.parse(localStorage.getItem("educations")).map((edu, index) => {
    educations[index] = { institute: edu };
  });
  JSON.parse(localStorage.getItem("degrees")).map((deg, index) => {
    educations[index].degree = deg;
  });
  JSON.parse(localStorage.getItem("dueDates")).map((date, index) => {
    educations[index].due_date = date;
  });
  JSON.parse(localStorage.getItem("aboutEducation")).map((about, index) => {
    educations[index].description = about;
  });

  if (selectBtnText.textContent == "საშუალო სკოლის დიპლომი") {
    educations[0].degree_id = 1;
  } else if (selectBtnText.textContent == "ზოგადსაგანმანათლებლო დიპლომი") {
    educations[0].degree_id = 2;
  } else if (selectBtnText.textContent == "ბაკალავრი") {
    educations[0].degree_id = 3;
  } else if (selectBtnText.textContent == "მაგისტრი") {
    educations[0].degree_id = 4;
  } else if (selectBtnText.textContent == "დოქტორი") {
    educations[0].degree_id = 5;
  } else if (selectBtnText.textContent == "ასოცირებული ხარისხი") {
    educations[0].degree_id = 6;
  } else if (selectBtnText.textContent == "სტუდენტი") {
    educations[0].degree_id = 7;
  } else if (selectBtnText.textContent == "კოლეჯი(ხარისიხს გარეშე)") {
    educations[0].degree_id = 8;
  } else if (selectBtnText.textContent == "სხვა") {
    educations[0].degree_id = 9;
  } else {
    educations[0].degree_id = 1;
  }

  localStorage.getItem("aboutEducation")
    ? null
    : localStorage.setItem("aboutEducation", JSON.stringify([""]));

  experiences = experiences.filter((exp) => {
    return Object.keys(exp).length < 5 ? false : true;
  });

  educations = educations.filter((exp) => {
    return Object.keys(exp).length < 5 ? false : true;
  });

  let formData = {
    name: localStorage.getItem("name"),
    surname: localStorage.getItem("surname"),
    email: localStorage.getItem("email"),
    phone_number: localStorage.getItem("mobile"),
    experiences: experiences,
    educations: educations,
    image: localStorage.getItem("photo"),
    about_me: localStorage.getItem("aboutMe"),
  };

  fetch(`${REDBERRY_URL}/api/cvs`, {
    method: "POST",
    headers: { "Content-Type": "multipart/form-data" },

    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

//////

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
//////

JSON.parse(localStorage.getItem("educations"))
  ? (fEducationUni.textContent = JSON.parse(
      localStorage.getItem("educations")
    )[0])
  : null;
JSON.parse(localStorage.getItem("degrees"))
  ? (fEducationDegree.textContent = JSON.parse(
      localStorage.getItem("degrees")
    )[0])
  : null;
JSON.parse(localStorage.getItem("dueDates"))
  ? (fEducationDate.textContent = JSON.parse(
      localStorage.getItem("dueDates")
    )[0])
  : null;
JSON.parse(localStorage.getItem("aboutEducation"))
  ? (fEducationAbout.textContent = JSON.parse(
      localStorage.getItem("aboutEducation")
    )[0])
  : null;

fPosition.textContent = JSON.parse(localStorage.getItem("positions"))[0];
fEmploy.textContent = JSON.parse(localStorage.getItem("employs"))[0];
fDate.textContent = `${JSON.parse(localStorage.getItem("startDates"))[0]} - ${
  JSON.parse(localStorage.getItem("endDates"))[0]
}`;
fAboutExperience.textContent = JSON.parse(localStorage.getItem("abouts"))[0];

//////
ending.addEventListener("click", submitForm);
function submitForm() {
  if (educationInput.value.length < 2) {
    return (educationInput.style.borderColor = "red");
  }
  if (selectBtnText.textContent == "აირჩიეთ ხარისხი") {
    return (selectBtn.style.borderColor = "red");
  }
  if (endDate.value == "") {
    return (endDate.style.borderColor = "red");
  }
  sendForm();
}
backVector.addEventListener("click", () => {
  localStorage.clear();
});
