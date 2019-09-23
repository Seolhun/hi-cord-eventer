import { ValidationResponse } from '@seolhun/localize-components-types';

/* eslint-disable no-underscore-dangle */
export const FORM_PROPERTIES = {
  value: 'value',
  hasError: 'hasError',
  message: 'message',
  isRequired: 'isRequired',
  requiredMessage: 'requiredMessage',
  // Events
  onValidation: 'onValidation',
  // Options
  isOnCreatedValidation: 'isOnCreatedValidation',
  isOnChangeValidation: 'isOnChangeValidation',
  onGroupValidation: 'onGroupValidation',
};

export interface FormBuilderProps {
  properties: Properties;
  handleOnValidation: (value?: any) => FormBuilder;
  setProperties: (Properties) => FormBuilder;
  setValue: (value) => FormBuilder;
  getPropertyValueBy: (keyName: string) => any;
  getProperties: () => Properties;
  getValues: () => void;
}

export interface Properties {
  value: any;
  hasError: boolean;
  message: string;
  isRequired: boolean;
  requiredMessage: string;
  // Events
  onValidation: (value: string) => ValidationResponse;
}

export interface Options {
  // Options
  isOnCreatedValidation: boolean;
  isOnChangeValidation: boolean;
  onGroupValidation: (value: string) => ValidationResponse;
}

class FormBuilder implements FormBuilderProps {
  properties: Properties;
  options: Options;

  constructor(properties, options) {
    const formProperties = this._initForm(properties, options);
    this.properties = formProperties.properties;
    this.options = formProperties.options;
  }

  // tslint:disable-next-line:variable-name
  private _initForm = (
    {
      // Values
      value,
      hasError = false,
      message = '',
      isRequired = false,
      requiredMessage,
      // Events
      onValidation = (value: string) => ({
        hasError: false,
        message: '',
      }),
    },
    {
      isOnCreatedValidation = false,
      isOnChangeValidation = false,
      onGroupValidation,
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
      hasError: isValidObject.hasError,
      message: isValidObject.message,
      isRequired,
      requiredMessage,
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
  getPropertyValueBy(propertyKey) {
    return this.properties[propertyKey];
  }

  getProperties() {
    return this.properties;
  }

  getValues() {
    const { value, hasError, message } = this.properties;

    return {
      value,
      hasError,
      message,
    };
  }
}

export default FormBuilder;
