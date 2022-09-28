
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
//import { checkMail } from "./utils/mail.mjs";
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
//close modal event
modalclose.addEventListener("click", closeModal);

//close modal form
function closeModal() {
  modalbg.style.display = "none";
}

function checkMail(unMail) {
  const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //return !regEx.test(unMail) ? false : true;
  if (!regEx.test(unMail)) {
    return false;
  } else {
    return true;
  }
}

//fonction pour controler le champ de formulaire
/*function checkChamp(unChamp) {
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
}*/
//fonction pour verifier le formulaire
const Test = {
  first: "Renseignez un prénom correct",
  last: "Renseignez un nom de famille correct",
  email: "Renseignez une adresse correcte",
  birthdate: "Renseignez une date",
  quantity: "Renseignez une quantité",
  location: "Veuillez sélectionner un tournoi",
  checkbox1: "Veuillez accepter les conditions d'utilisation"
}
//console.log(Test);
function genererErrorMsg(key) {
  const localError = document.createElement("p");
  unControle = document.getElementsByName(`${key}`);
  localError.innerText = Test[key];
  localError.classList.add("errorMsg");
  console.log(key);
  unControle[0].parentElement.appendChild(localError);
  //console.log(document.querySelector(".errorMsg").closest("div").contains(document.getElementsByName(`${key}`)[0]));
}
function supprErrorMsg() {
  const formData = document.getElementsByClassName("formData");
  for (let i = 0; i < formData.length; i++) {
    if (formData[i].contains(document.querySelector(".errorMsg"))) {
      const element = document.querySelector(".errorMsg");
      element.remove();
    }
  }
}

//console.log(submit.parentElement)
/*function checkForm() {
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
        case 'tos': msgError = "Veuillez accepter les conditions d'utilisation";
          break;
      }

      controle.style.borderColor = "red";
      genererErrorMsg(msgError, controle);
      /*error.style.display = "flex";*/
/*errors++;
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
}*/

//Vérification form (message si invalide)
submit.addEventListener("click", function (event) {
  event.preventDefault();
  const formData = getFormData();
  const Validation = validationForm(formData);
  //const value = checkForm();
  //console.log(formData);
  if (Validation) {
    closeModal();
    modalbg2.style.display = "block";
  }
});


const validationForm = (data) => {
  let errors = 0;
  for (const key in data) {
    const input = document.querySelector(`#${key}`);
    switch (key) {
      case 'first':
        if (data[key].length >= 2) {
          input.style.borderColor = 'green';
          supprErrorMsg();
        } else {
          errors++;
          input.style.borderColor = 'red';
          genererErrorMsg(key);
        }

        break
      case 'last':

        if (data[key].length >= 2) {
          input.style.borderColor = 'green';
          supprErrorMsg();
        } else {
          errors++;
          input.style.borderColor = 'red';
          genererErrorMsg(key);
        }

        break
      case 'email':

        if (!checkMail(data[key])) {
          //console.log(checkMail(data[key]));
          errors++;
          genererErrorMsg(key);
          input.style.borderColor = 'red';

        } else {
          input.style.borderColor = 'green';
          supprErrorMsg();
        }

        break
      case 'birthdate':

        if (!data[key]) {
          errors++;
          input.style.borderColor = 'red';
          genererErrorMsg(key);
        } else {
          input.style.borderColor = 'green';
          supprErrorMsg();
        }

        break
      case 'quantity':

        if (!data[key]) {
          errors++;
          input.style.borderColor = 'red';
          genererErrorMsg(key);
        } else {
          input.style.borderColor = 'green';
          supprErrorMsg();
        }

        break
      case 'location':

        if (data[key] == "on" || data[key] == null) {
          errors++;
          genererErrorMsg(key);
          //input.style.borderColor = 'red';
        } else {
          supprErrorMsg();
          //input.style.borderColor = 'green';
        }

        break
      case 'checkbox1':
        if (data[key] == false) {
          errors++;
          genererErrorMsg(key);
          //input.style.borderColor = 'red';
        } else {
          supprErrorMsg();
          //input.style.borderColor = 'green';
        }

        break

      default:
        return 0
    }

  }
  return errors != 0 ? false : true;
}
function getFormData() {
  return {
    first: document.querySelector('#first').value,
    last: document.querySelector('#last').value,
    email: document.querySelector('#email').value,
    birthdate: document.querySelector('#birthdate').value,
    quantity: document.querySelector('#quantity').value,
    location: document.querySelector('.checkbox-input:checked')
      ? document.querySelector('.checkbox-input:checked').value
      : null,
    checkbox1: document.querySelector('#checkbox1').checked
  }
}