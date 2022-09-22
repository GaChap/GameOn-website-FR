function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalclose = document.querySelector(".close");
const modalbg = document.querySelector("#modal-1");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const radios = Array.from(document.getElementsByName("location"));
const submit = document.querySelector(".btn-submit");
const errorPrenom = document.querySelector("#error-prenom");
const errorNom = document.querySelector("#error-nom");
const errorMail = document.querySelector("#error-email");
const errorAge = document.querySelector("#error-age");
const errorQuant = document.querySelector("#error-quant");
const errorRadio = document.querySelector("#error-radio");
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

//fonction de validation du mail
function checkMail() {
  const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mail = document.querySelector("#email").value;
  if (mail && regEx) {
    if (!regEx.test(mail)) {
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
  if (unChamp.type != "checkbox") {
    if (unChamp.type == "radio") {
      if (radios.find(radio => radio.checked)) {
        return true;
      }
      else {
        return false;
      }
    } else {
      if (unChamp.type == "email") {
        const formMail = checkMail();
        if (formMail) {
          return true;
        } else {
          return false;
        }
      } else {
        if (unChamp.value) {
          return true;
        } else {
          return false;
        }
      }
    }
  } else {
    if (unChamp.checked) {
      return true;
    } else {
      return false;
    }
  }
}
//fonction pour verifier le formulaire
function checkForm() {
  let errors = 0;
  for (let i = 0; i < formLength; i++) {
    const controle = form[i];
    const error = document.querySelector("#error-" + controle.name);
    const booleanChamp = checkChamp(controle);
    if (!booleanChamp) {
      error.style.display = "flex";
      controle.classList.add('input-error');
      controle.classList.remove('input-valid');
      errors++;
    } else {
      error.style.display = "none";
      controle.classList.add('input-valid');
      controle.classList.remove('input-error');
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