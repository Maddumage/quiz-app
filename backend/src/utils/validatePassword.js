exports.validatePassword = (user, password) => {
  try {
    if (user && password) {
      return user.password === password;
    }
    return false;
  } catch (error) {
    return false;
  }
};
