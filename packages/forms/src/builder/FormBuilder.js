/* eslint-disable no-underscore-dangle */
export const FORM_VALUE_PROPERTIES = {
  /**
   * @requires
   * @type string
   */
  value: 'value',
  /**
   * @requires
   * @type string
   */
  htmlFor: 'htmlFor',
  // isNotRequired
  /**
   * @default false
   * @type boolean
   */
  hasError: 'hasError',
  /**
   * @default false
   * @type boolean
   */
  isFocus: 'isFocus',
  /**
   * @default false
   * @type boolean
   */
  isRequired: 'isRequired',
  /**
   * @default ''
   * @type string
   */
  requiredMessage: 'requiredMessage',
  /**
   * @default false
   * @type boolean
   */
  message: 'message',
  /**
   * @default 'text'
   * @type string
   */
  type: 'type',
};

export const FORM_PROPERTIES = {
  ...FORM_VALUE_PROPERTIES,
  /**
   * @default () => { hassError: false, message: '' }
   * @type function
   */
  onValidation: 'onValidation',
  /**
   * @default { hassError: false, message: '' }
   * @type function
   */
  onGroupValidationBy: 'onGroupValidationBy',
  /**
   * @default false
   * @type boolean
   */
  isOnCreatedValidation: 'isOnCreatedValidation',
  /**
   * @default true
   * @type boolean
   */
  isOnChangeValidation: 'isOnChangeValidation',
};

// Will be improvement considering browser
const REQUIRED_CHECKING_TYPES = {
  hasError: 'boolean',
  htmlFor: 'string',
  isFocus: 'boolean',
  isRequired: 'boolean',
  message: 'string',
  onValidation: 'function',
  requiredMessage: 'string',
  type: 'string',
  // Group Options
  onGroupValidationBy: 'function',
  isOnCreatedValidation: 'boolean',
  isOnChangeValidation: 'boolean',
};

class FormBuilder {
  constructor(props, options) {
    if (!this._checkFormPropertiesValidation(props, options)) {
      throw new Error('Properties types are not right');
    }

    const {
      htmlFor,
      key,
      value,
      // isNotRequired
      hasError,
      isFocus,
      isRequired,
      message,
      onValidation,
      requiredMessage,
      type,
      // Group Options
      onGroupValidationBy,
      isOnCreatedValidation,
      isOnChangeValidation,
    } = this._buildFormProperties(props, options);

    this.key = key;
    this.value = value;
    this.hasError = hasError;
    this.message = message;
    this.isFocus = isFocus;
    this.isRequired = isRequired;
    this.requiredMessage = requiredMessage;
    this.htmlFor = htmlFor;
    this.type = type;
    this.onValidation = onValidation;
    // Group Options
    this.onGroupValidationBy = onGroupValidationBy;
    this.isOnCreatedValidation = isOnCreatedValidation;
    this.isOnChangeValidation = isOnChangeValidation;

    if (this.isOnCreatedValidation) {
      const onValidationResult = onValidation(value);
      this.hasError = onValidationResult.hasError;
      this.message = onValidationResult.message;
    }
  }

  _buildFormProperties = ({
    htmlFor,
    key,
    value = '',
    // isNotRequired
    hasError = false,
    isFocus = false,
    isRequired = false,
    message = '',
    requiredMessage = '',
    type = 'text',
    onValidation = () => ({
      hasError: false,
      message: '',
    }),
  } = {
    htmlFor,
    key,
    value: '',
    // isNotRequired
    hasError: false,
    isFocus: false,
    isRequired: false,
    message: '',
    requiredMessage: '',
    type: 'text',
    onValidation: () => ({
      hasError: false,
      message: '',
    }),
  },
  // Group Options
  {
    onGroupValidationBy = () => ({
      hasError: false,
      message: '',
    }),
    isOnCreatedValidation = false,
    isOnChangeValidation = true,
  } = {
    onGroupValidationBy: () => ({
      hasError: false,
      message: '',
    }),
    isOnCreatedValidation: false,
    isOnChangeValidation: true,
  }) => {
    const validationResult = onValidation(value);
    if (
      typeof validationResult.hasError !== 'boolean' ||
      typeof validationResult.message !== 'string'
    ) {
      throw new Error('onValidation properties must return { hasError: boolean, message: string }');
    }

    if (!key && !htmlFor) {
      throw new Error('One of key and htmlFor property is required, Set unique name to use Form key');
    }

    return {
      key: key || htmlFor,
      value,
      isFocus,
      // isNotRequired
      hasError,
      message,
      isRequired,
      requiredMessage,
      htmlFor,
      type,
      onValidation,
      // Group Options
      onGroupValidationBy,
      isOnCreatedValidation,
      isOnChangeValidation,
    };
  }

  _checkFormPropertiesValidation = (props, options) => {
    const allProps = {
      ...props,
      ...options,
    };

    const isValidProperty = Object
      .keys(REQUIRED_CHECKING_TYPES)
      .every((key) => {
        if (typeof allProps[key] !== 'undefined') {
          const propertyType = typeof allProps[key];
          return REQUIRED_CHECKING_TYPES[key] === propertyType;
        }
        return true;
      });
    return isValidProperty;
  }

  _handleOnValidation = (value = this.value) => {
    if (this.isRequired && !value) {
      this.hasError = true;
      this.message = this.requiredMessage;
      return this;
    }

    const { hasError, message } = this.onValidation(value);
    this.hasError = hasError;
    this.message = message;

    if (!this.hasError) {
      this.handleOnGroupValidation(this.key);
    }

    return this;
  }

  handleOnGroupValidation = (currentKey) => {
    this.onGroupValidationBy(currentKey);
    return this;
  }

  setRef = (ref = this.ref, isOverride = false) => {
    if (isOverride || (ref && !this.ref)) {
      this.ref = ref;
    }
    return this;
  }

  setProperties({
    // Props
    key = this.key,
    value = this.value,
    htmlFor = this.htmlFor,
    // isNotRequired
    hasError = this.hasError,
    isFocus = this.isFocus,
    isRequired = this.isRequired,
    message = this.message,
    requiredMessage = this.requiredMessage,
    type = this.type,
    // Events
    onValidation = this.onValidation,
    onGroupValidationBy = this.onGroupValidationBy,
    // Options
    isOnChangeValidation = this.isOnChangeValidation,
  }) {
    // Props
    this.key = key;
    this.htmlFor = htmlFor;
    // isNotRequired
    this.isFocus = isFocus;
    this.type = type;
    this.hasError = hasError;
    this.message = message;
    this.isRequired = isRequired;
    this.requiredMessage = requiredMessage;
    // Events
    this.onValidation = onValidation;
    this.onGroupValidationBy = onGroupValidationBy;
    // Options
    this.isOnChangeValidation = isOnChangeValidation;

    // Never move to up, re-set after validation
    this.setValue(value);

    return this;
  }

  setValue(value, ref) {
    if (ref) {
      this.setRef(ref);
    }
    if (value !== this.value && this.isOnChangeValidation) {
      this._handleOnValidation(value);
    }
    this.value = value;
    return this;
  }

  getValueBy(valueKey) {
    return this[valueKey];
  }

  getValues() {
    return Object.keys(FORM_VALUE_PROPERTIES).reduce((obj, key) => ({
      ...obj,
      [key]: this[key],
    }), {});
  }

  runValidation(value = this.value) {
    if (this.value !== value) {
      this.setValue(value);
    }

    return this._handleOnValidation(value);
  }

  focusFormRef = (ref = this.ref) => {
    if (ref && this.isFocus) {
      this.setRef(ref);
      this.ref.focus();
    }
    return this;
  }
}

export default FormBuilder;
