import { useCallback, useReducer } from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.payload,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity, // for the overall form
  });

  // for avoid infinite loop, we use the useCallback hook
  // otherwise this function will be call every time the state of this component changed
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      payload: value,
      inputId: id,
      isValid: isValid,
    });
  }, []);

  return [formState, inputHandler];
};
