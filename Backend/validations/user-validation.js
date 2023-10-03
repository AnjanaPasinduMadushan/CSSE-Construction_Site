const mobileNoPattern = /^(\+94|0)(7\d{8})$/;
const emailPattern = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}/;
const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

const checkingMobileValidation = (mobile) => {
  return mobileNoPattern.test(mobile)
}

const validateEmail = (email) => {
  return emailPattern.test(email);
};

const validatePWD = (pwd) => {
  return pwdPattern.test(pwd);
};

export { checkingMobileValidation };
export { validateEmail };
export { validatePWD };