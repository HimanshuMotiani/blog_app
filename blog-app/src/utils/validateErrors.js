export default function validateErrors(errors, name, value) {
  switch (name) {
    case "email":
      let emailError = value.includes("@") ? "" : "Email must contain @ symbol";
      errors.email = emailError;
      break;
    case "password":
      let passwordError =
        value < 6 ? "Password must be greater than 6 characters" : "";
      errors.password = passwordError;
      break;
    case "username":
      let userNameError =
        value.length < 4 ? "Username should be at-least 4 characters long" : "";
      errors.username = userNameError;
      break;
    case "title":
      let titleError = value.length === 0 ? "field can not be empty!" : "";
      errors.title = titleError;
      break;
    case "description":
      let descriptionError =
        value.length === 0 ? "field can not be empty!" : "";
      errors.description = descriptionError;
      break;
    case "body":
      let articleError = value.length === 0 ? "field can not be empty!" : "";
      errors.body = articleError;
      break;
    case "tagList":
      let tagListError = value.length === 0 ? "field can not be empty!" : "";
      errors.tagList = tagListError;
      break;
  }
}
