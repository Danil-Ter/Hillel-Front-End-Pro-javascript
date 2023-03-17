import { Validator, isNotEmpty, isEmail, rangeLength, isValidPassword, isPasswordConfirmed } from "./src/js/validator.js";

const humanFormConfigs = {
  username: [isNotEmpty, rangeLength(3, 25)],
  email: [isNotEmpty, isEmail()],
  password: [isNotEmpty, isValidPassword],
  confirm_password: [isNotEmpty, isPasswordConfirmed("password")],
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
    const { target } = event;
    const config = humanFormConfigs[target.name];
  
    if (!config) return;
  
    const isValid = Validator.validate({ [target.name]: config }, form);
    const errors = Validator.getErrors(form.name)?.[target.name] ?? {};
    const messageError = form.querySelector(`[data-for="${target.name}"]`);
  
    messageError.innerHTML = Object.values(errors)
      .map((message) => `<span>${message}</span>`)
      .join("<br>");
  
    target.style.borderColor = isValid ? "green" : "red";
    target.style.backgroundColor = "white";
  });
}

document.addEventListener("DOMContentLoaded", init);
