

export const isValidEmail = (email) => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return !!match; // we force the value to be a boolean
};

// returns a string if the email is not valid
export const isEmail = (email) => {
  return isValidEmail(email)
    ? undefined
    : 'El correo no parece ser válido';
}