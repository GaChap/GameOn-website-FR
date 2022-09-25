
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
//import { checkMail } from "./utils/function.js";
// DOM Elements
const modalclose = document.querySelector(".close");
const modalbg = document.querySelector("#modal-1");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const radios = Array.from(document.getElementsByName("location"));
const submit = document.querySelector(".btn-submit");
const modalbg2 = document.querySelector("#modal-2");
const form = Array.from(document.getElementsByName("reserve")[0]);
const formLength = form.length - 2;

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
/*const ancestor = document.querySelector(".content").closest(".bground");
ancestor.addEventListener("click", closeModal);
console.log(ancestor);*/
//close modal event
modalclose.addEventListener("click", closeModal);

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function checkMail(unMail) {
  const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (unMail && regEx) {
    if (!regEx.test(unMail)) {
      return false;
    } else {
      return true;
    }
  }
  else {
    return false;
  }
}

//fonction pour controler le champ de formulaire
function checkChamp(unChamp) {
  switch (unChamp.type) {
    case 'checkbox':
      if (unChamp.checked) {
        return true;
      } else {
        return false;
      }
      break;
    case 'radio':
      if (radios.find(radio => radio.checked)) {
        return true;
      }
      else {
        return false;
      }
      break;
    case 'email':
      const formMail = checkMail(unChamp.value);
      //formMail ? true : false
      if (formMail) {
        return true;
      } else {
        return false;
      }
      break;
    default:
      if (unChamp.value) {
        return true;
      } else {
        return false;
      }
  }
}
//fonction pour verifier le formulaire
const Test = [
  { first: "Renseignez un prénom" },
  { last: "Renseignez un nom de famille" },
  { email: "Renseignez une adresse correcte" },
  { birthdate: "Renseignez une date" },
  { quantity: "Renseignez une quantité" },
  { location: "Veuillez sélectionner un tournoi" },
  { checkbox1: "Veuillez accepter les conditions d'utilisation" }
]
function genererErrorMsg(unMsgError, unControle) {
  const localError = document.createElement("p");
  localError.innerText = unMsgError;
  localError.ariaLabel = "error-" + unControle.name;
  unControle.parentElement.appendChild(localError);
}

//console.log(submit.parentElement)
function checkForm() {
  let errors = 0;
  for (let i = 0; i < formLength; i++) {
    const controle = form[i];
    //const error = document.querySelector("#error-" + controle.name);
    const booleanChamp = checkChamp(controle);
    if (!booleanChamp) {
      const error = controle.name;
      let msgError = "";
      switch (controle.name) {
        case 'first': msgError = "Renseignez un prénom";
          break;
        case 'last': msgError = "Renseignez un nom de famille";
          break;
        case 'email': msgError = "Renseignez une adresse correcte";
          break;
        case 'birthdate': msgError = "Renseignez une date";
          break;
        case 'quantity': msgError = "Renseignez une quantité";
          break;
        case 'location': msgError = "Veuillez sélectionner un tournoi";
          break;
        case 'checkbox1': msgError = "Veuillez accepter les conditions d'utilisation";
          break;
      }

      controle.style.borderColor = "red";
      genererErrorMsg(msgError, controle);
      /*error.style.display = "flex";*/
      errors++;
    } else {
      //error.style.display = "none";
      controle.style.borderColor = "green";
    }
  }
  if (errors != 0) {
    return false;
  } else {
    return true;
  }
}

//Vérification form (message si invalide)
submit.addEventListener("click", function (event) {
  const value = checkForm();
  if (value) {
    event.preventDefault();
    closeModal();
    modalbg2.style.display = "block";
  } else {
    event.preventDefault();
  }
});