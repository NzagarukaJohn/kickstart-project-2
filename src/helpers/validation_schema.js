import Joi from 'joi';

export const signupAuthSchema = Joi.object({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
    .required(),
  user_role: Joi.string()
    .valid('rra_admin', 'police_admin', 'ebm_claimer')
    .required(),
  gender: Joi.string(),
  password: Joi.string()
    .min(4)
    .pattern(new RegExp('^[a-zA-Z]{3,30}$'))
    .required(),
  repeat_password: Joi.ref('password'),
  email: Joi.string().lowercase().email(),
  tinNumber: Joi.string().min(9).max(9).required(), 
  IDNumber: Joi.string().min(16).max(16).required(),
});

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().alphanum().required(),
  lastName: Joi.string().alphanum().required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': `Phone number must have 10 digits.` })
    .required(),

  gender: Joi.string(),
  email: Joi.string().lowercase().email().required(),
  preferredLanguage: Joi.string().alphanum(),
  preferredCurrency: Joi.string(),
});

export const ebmClaimRequestSchema = Joi.object({
  claimReason: Joi.string().valid('lost', 'stolen', 'damaged', 'other').required(),
  claimDetails: Joi.string().allow(''),
  dateOfTheCase: Joi.string().required(),
  place: Joi.string(),

});
export const tripRequestUpdateSchema = Joi.object({
  leavingFrom: Joi.string().required(),
  travelDate: Joi.string().required(),
  place: Joi.string(),
  travelReason: Joi.string().required(),
});
