export interface ValidationResponse {
  hasError: boolean;
  message: string;
}

export interface FormBuilderValues {
  value: string | number | boolean;
  hasError?: boolean;
  message?: string;
}

export interface FormBuilderProperties extends FormBuilderValues {
  type?: string;
  isRequired?: boolean;
  requiredMessage?: string;
  htmlFor?: string;
  isFocus?: boolean;
  onValidation: (value: string | number | boolean) => ValidationResponse;
}

export interface FormBuilderOptions {
  onGroupValidation?: (value: string) => ValidationResponse;
  isOnCreatedValidation?: boolean;
  isOnChangeValidation?: boolean;
}


export interface FormBuilderProps {
  properties: FormBuilderProperties;
  handleOnValidation: (value?: any) => FormBuilder;
  setProperties: (Properties) => FormBuilder;
  setValue: (value) => FormBuilder;
  getPropertyValueBy: (keyName: keyof FormBuilderProperties) => any;
  getProperties: () => FormBuilderProperties;
  getValues: () => void;
}


export class FormBuilder implements FormBuilderProps {
  properties: FormBuilderProperties;
  options: FormBuilderOptions;

  constructor(properties, options) {
    const formProperties = this._initForm(properties, options);
    this.properties = formProperties.properties;
    this.options = formProperties.options;
  }

  // tslint:disable-next-line:variable-name
  private _initForm = (
    {
      // Values
      value = '',
      type = 'text',
      hasError = false,
      message = '',
      isRequired = false,
      requiredMessage = '',
      htmlFor = '',
      isFocus = false,
      // Events
      onValidation = (value: string) => ({
        hasError: false,
        message: '',
      }),
    },
    {
      onGroupValidation,
      isOnCreatedValidation = false,
      isOnChangeValidation = false,
    },
  ) => {
    let isValidObject = {
      hasError,
      message,
    };
    if (isOnCreatedValidation) {
      isValidObject = onValidation(value);
    }

    const properties = {
      value,
      type,
      hasError: isValidObject.hasError,
      message: isValidObject.message,
      isRequired,
      requiredMessage,
      htmlFor,
      isFocus,
      onValidation,
    };
    const options = {
      isOnCreatedValidation,
      isOnChangeValidation,
      onGroupValidation,
    };
    return {
      properties,
      options,
    };
  }

  // tslint:disable-next-line:variable-name
  handleOnValidation = (value = this.properties.value) => {
    if (this.properties.isRequired && !value) {
      this.setProperties({
        hasError: true,
        message: this.properties.requiredMessage,
      });
      return this;
    }
    const isValidObject = this.properties.onValidation(value);
    this.setProperties({
      ...isValidObject,
    });
    return this;
  }

  setProperties(newProperties) {
    this.properties = {
      ...this.properties,
      ...newProperties,
    };
    return this;
  }

  setValue(value) {
    if (this.options.isOnChangeValidation) {
      this.handleOnValidation(value);
    }
    this.setProperties({
      value,
    });
    return this;
  }

  /**
   * Finished Methods
   */
  getValidation(): ValidationResponse {
    return {
      hasError: this.properties.hasError,
      message: this.properties.message,
    }
  }

  getPropertyValueBy(propertyKey: keyof FormBuilderProperties) {
    return this.properties[propertyKey];
  }

  getProperties() {
    return this.properties;
  }

  getValues(): FormBuilderValues {
    const { value, hasError, message } = this.properties;

    return {
      value,
      hasError,
      message,
    };
  }
}

export default FormBuilder;
