import { bothIncludes, intersect } from '@util/array.util';

interface Input {
  value: string;
  formValidationTypes: InputValidationType[];
  visualValidationTypes: InputValidationType[];
}

interface AdvancedInput extends Input {
  formValid: boolean;
  visualValid: boolean;
}

const validateInput = (input: Input): AdvancedInput => {
  const { formValidationTypes, value, visualValidationTypes } = input;

  const validationTypes = intersect(formValidationTypes, visualValidationTypes);

  for (let i = 0; i < validationTypes.length; i += 1) {
    const validationType = validationTypes[i];

    if (validationType === 'notEmptyStr' && value === '') {
      if (bothIncludes(formValidationTypes, visualValidationTypes, validationType)) {
        return { ...input, formValid: false, visualValid: false };
      }

      if (formValidationTypes.includes(validationType)) {
        return { ...input, formValid: true, visualValid: false };
      }

      if (visualValidationTypes.includes(validationType)) {
        return { ...input, formValid: false, visualValid: true };
      }
    }
  }

  return { ...input, formValid: true, visualValid: true };
};

export default validateInput;
