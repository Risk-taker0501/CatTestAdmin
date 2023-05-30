const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateEditInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.oldpassword = !isEmpty(data.oldpassword) ? data.oldpassword : "";
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";

  // Email checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "username field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.oldpassword)) {
    errors.oldpassword = "OldPassword field is required";
  }

  if (Validator.isEmpty(data.newpassword)) {
    errors.newpassword = "NewPassword field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
