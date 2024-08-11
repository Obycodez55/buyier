export enum ErrorMessages {
    INVALID_EMAIL_PASSWORD = 'Invalid Email or Password',
    EMAIL_EXISTS = 'Email Exists Already',
    USER_WITH_EMAIL_NOT_FOUND = 'User with email not Found',
    REGISTER_USER_FAILED = 'Error Occurred While creating new User',
    FORGOT_PASSWORD_FAILED = 'Forgot Password Failed',
    RESET_PASSWORD_FAILED = 'Reset Password Failed',
    INVALID_RESET_HASH = 'Invalid Reset Hash',
    INVALID_CONFIRM_PASSWORD = 'Invalid Confirm Password',
    USER_UNAUTHORIZED = 'User Unauthorized',
    USER_NOT_FOUND = 'User Not Found',
    GET_USER_BY_ID_FAILED = 'Unable to Fetch User by ID',
    GET_USER_BY_EMAIL_FAILED = 'Unable to Fetch User by Email',
    NO_AUTH_ERROR = 'Authorization Header Missing',
    INVALID_AUTH_TOKEN_SUPPLIED = 'Invalid Auth Token Supplied',
    NO_CODE_HASH = "One of Code or Hash is required"
  }