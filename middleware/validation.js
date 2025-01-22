import { body, validationResult } from 'express-validator';

const contactValidationRules = () => [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string'),

  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),

  body('favoriteColor').optional().trim().isString().withMessage('Favorite color must be a string'),

  body('birthday')
    .optional()
    .isISO8601()
    .withMessage('Birthday must be a valid date in ISO 8601 format (YYYY-MM-DD)')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    [err.path]: err.msg
  }));

  return res.status(400).json({
    success: false,
    errors: extractedErrors
  });
};
export { contactValidationRules, validate };
