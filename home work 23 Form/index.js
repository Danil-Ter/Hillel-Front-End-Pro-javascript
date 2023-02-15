import { Validator, isNotEmpty, isEmail, length, isValidPassword, isPasswordMatch } from "./src/js/validator.js";

const humanFormConfigs = {
  username: [isNotEmpty, length(3, 25)],
  email: [isNotEmpty, isEmail()],
  password: [isNotEmpty, isValidPassword],
  password2: [isNotEmpty, isPasswordMatch],
};

const init = function () {
  let form = document.human;
  let sendDtn = form.querySelector(".btn-send");

  sendDtn.onclick = function (event) {
    event.preventDefault();

    [...form.elements].forEach((el) => {
      if (el.type !== "submit") {
        let messageError = form.querySelector(`[data-for="${el.name}"]`);
        messageError.innerHTML = "";
        el.classList.remove("error");
      }
    });

    let isValid = Validator.validate(humanFormConfigs, form);

    if (!isValid) {
      console.log(Validator.getErrors(form.name));
      Object.entries(Validator.getErrors(form.name)).forEach(
        ([name, error]) => {
          let messageError = form.querySelector(`[data-for="${name}"]`);
          form.elements[name].classList.add("error");
          messageError.innerHTML = Object.values(error)
            .map((message) => `<span>${message}</span>`)
            .join("<br>");
        }
      );

      return;
    }
  };

  form.addEventListener("input", function (event) {
    let target = event.target;
    if (!humanFormConfigs[target.name]) return;

    let isValid = Validator.validate(
      { [target.name]: humanFormConfigs[target.name] },
      form
    );
    let errors = Object.values(
      Validator.getErrors(form.name)?.[target.name] || {}
    );
    let messageError = form.querySelector(`[data-for="${target.name}"]`);

    if (!isValid) {
      messageError.innerHTML = errors
        .map((message) => `<span>${message}</span>`)
        .join("<br>");

      target.style.borderColor = "red";
      target.style.backgroundColor = "white";
    } else {
      messageError.innerHTML = "";
      target.style.borderColor = "green";
      target.style.background = "white";
    }
  });
};

document.addEventListener("DOMContentLoaded", init);
