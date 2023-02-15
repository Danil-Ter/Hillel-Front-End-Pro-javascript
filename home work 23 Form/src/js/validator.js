import ValidationError from "./validation-error.js";

export const Validator = {
  errors: {},
  validators: {
    isNotEmpty: {
      validate: (value) => value !== "",
      message: "The field can't be empty",
      errorType: "required",
    },
    isNumber: {
      validate: (value) => !isNaN(value) && Number.isInteger(+value),
      message: "The field should has a integer",
      errorType: "number",
    },
    length(min, max) {
      return {
        validate: (value) => value.length <= max && value.length >= min,
        message: `Username must be between ${min} and ${max} characters`,
        errorType: "maxLength",
      };
    },
    isEmail() {
      return {
        validate: (value) => {
          const emailRegex =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return emailRegex.test(value);
        },
        message: "Invalid email format",
        errorType: "email",
      };
    },
    isValidPassword: {
      validate: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])\S{8,}$/.test(value),
      message:
        "Password must have at least 8 characters that include at least 1 lowercase character, 1 uppercase character, 1 number, and 1 special character in (!@#$%^&*)",
      errorType: "password",
    },
    isPasswordMatch: {
      validate: (value) => value === form.elements["password"].value,
      message: "Plese enter the password again",
      errorType: "password_match",
    },
  },

  validate(config, form) {
    if (!(form instanceof HTMLFormElement)) {
      throw new ValidationError("You should provide HTML Form");
    }

    let elements = form.elements;
    this.errors[form.name] = {};

    for (const [inputName, inputValidators] of Object.entries(config)) {
      if (!inputValidators.length) {
        continue;
      }

      if (!elements[inputName]) {
        throw new ValidationError(
          `The [${inputName}] field doesn't exist in the [${form.name}]`
        );
      }

      const value = elements[inputName].value;
      let errors = this.errors[form.name];

      inputValidators.forEach(({ validate, errorType, message }) => {
        if (!validate(value)) {
          errors[inputName] = {
            ...errors[inputName],
            [errorType]: message,
          };
        }
      });
    }

    return !this.hasError(form.name);
  },

  hasError(formName) {
    return !!Object.keys(this.errors[formName]).length;
  },

  getErrors(formName) {
    return this.errors[formName];
  },
};

export const { isNotEmpty, isEmail, length, isValidPassword, isPasswordMatch } =
  Validator.validators;
