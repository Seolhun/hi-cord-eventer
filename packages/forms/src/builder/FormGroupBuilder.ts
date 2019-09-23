/* eslint-disable no-underscore-dangle */
import {
  FormBuilder,
  FormBuilderProps,
} from './FormBuilder';

class FormGroupBuilder {
  group: {
    [key: string]: FormBuilderProps,
  };
  isDisabled: boolean;

  constructor(forms, {
    isDisabled = false,
    isOnCreatedValidation = false,
    isOnChangeValidation = false,
    onGroupValidation = () => ({
      hasError: false,
      message: '',
    }),
  },
  ) {
    this.isDisabled = isDisabled;
    this.group = Object.keys(forms).reduce(
      (obj, key) => ({
        ...obj,
        [key]: new FormBuilder(
          {
            ...forms[key],
          },
          {
            isOnChangeValidation,
            isOnCreatedValidation,
            onGroupValidation,
          },
        ),
      }),
      {},
    );
    if (isOnCreatedValidation) {
      this._executeAllFormValidation();
    }
  }

  // tslint:disable-next-line:variable-name
  _executeAllFormValidation = () => {
    this.isDisabled = Object.keys(this.group).some((key) =>
      this.group[key]
        .handleOnValidation()
        .getPropertyValueBy('hasError'),
    );
    return this;
  }

  /**
   * Finished Methods
   */
  getHasErrorAllForm = () => this._executeAllFormValidation().isDisabled;

  getFormByName = (name) => this.group[name];

  getGroup = () => this.group;
}

export default FormGroupBuilder;
