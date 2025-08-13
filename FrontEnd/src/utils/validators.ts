export const FIELD_REQUIRED_MESSAGE: string = 'This field is required.'
export const EMAIL_RULE: RegExp = /^\S+@\S+\.\S+$/
export const EMAIL_RULE_MESSAGE: string =
  'Email is invalid. (example@nhatquangdev.com)'
export const PASSWORD_RULE: RegExp =
  /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d\W]{8,256}$/
export const PASSWORD_RULE_MESSAGE: string =
  'Password must include at least 1 letter, a number, and at least 8 characters.'
export const PASSWORD_CONFIRMATION_MESSAGE: string =
  'Password Confirmation does not match!'
