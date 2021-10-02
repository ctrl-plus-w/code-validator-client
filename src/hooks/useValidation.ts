import validateInput from '@helper/form.helper';
import { useCallback } from 'react';

interface Input {
  value: string;
  formValidationTypes: InputValidationType[];
  visualValidationTypes: InputValidationType[];
}

interface AdvancedInput extends Input {
  formValid: boolean;
  visualValid: boolean;
}

const useValidation = (
  value: string,
  formValidationTypes: InputValidationType[],
  visualValidationTypes: InputValidationType[],
): AdvancedInput => {
  return useCallback(validateInput, [value])({ value, formValidationTypes, visualValidationTypes });
};

export default useValidation;
