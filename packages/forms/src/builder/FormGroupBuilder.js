/* eslint-disable no-underscore-dangle */
import FormBuilder, { FORM_PROPERTIES } from './FormBuilder';

export const FORM_GROUP_PROPERTIES = {
  /**
   * @default false
   * @type boolean
   */
  isAllChangeValidation: 'isAllChangeValidation',
  /**
   * @default false
   * @type boolean
   */
  isDisabled: 'isDisabled',
  /**
   * @default true
   * @type boolean
   */
  isOnChangeValidation: 'isOnChangeValidation',
  /**
   * @default false
   * @type boolean
   */
  isOnCreatedValidation: 'isOnCreatedValidation',
  /**
   * @default { key: '', watchKeys: ''. hassError: false, message: '' }
   * @type function
   */
  onGroupValidation: 'onGroupValidation',
};

// Will be improvement considering browser
const REQUIRED_CHECKING_TYPES = {
  isAllChangeValidation: 'boolean',
  isDisabled: 'boolean',
  isOnChangeValidation: 'boolean',
  isOnCreatedValidation: 'boolean',
  onGroupValidation: 'function',
};

class FormGroupBuilder {
  constructor(forms, options) {
    if (!this._checkOptionProperties(options)) {
      throw new Error('Option propertie types are not right');
    }

    const {
      isAllChangeValidation = false,
      isDisabled = false,
      isOnChangeValidation = true,
      isOnCreatedValidation = false,
      onGroupValidation = () => ({
        hasError: false,
        message: '',
      }),
    } = options;

    this.refs = null;
    this.storedWatchKeys = [];
    this.isAllChangeValidation = isAllChangeValidation;
    this.isDisabled = isDisabled;
    this.onGroupValidation = onGroupValidation;
    this.group = Object.keys(forms).reduce((obj, key) => ({
      ...obj,
      [key]: new FormBuilder({
        ...forms[key],
        key,
      }, {
        isAllChangeValidation,
        isOnChangeValidation,
        isOnCreatedValidation,
        onGroupValidationBy: this._handleOnGroupValidationBy,
      }),
    }), {});

    if (isOnCreatedValidation) {
      this._executeAllFormValidation();
    }
  }

  _checkOptionProperties  (properties) => {
    const isValidProperty = Object
      .keys(REQUIRED_CHECKING_TYPES)
      .every((key) => {
        if (properties[key]) {
          const propertyType = typeof properties[key];
          const validType = REQUIRED_CHECKING_TYPES[key];
          return validType === propertyType;
        }
        return true;
      });
    return isValidProperty;
  }

  _hasValidKeys = (keys, targetKey) => {
    if (Array.isArray(keys)) {
      return keys.includes(targetKey);
    }

    return keys === targetKey;
  }

  _handleOnGroupValidationBy = (currentKey) => {
    const {
      key,
      watchKeys,
      hasError,
      message,
    } = this.onGroupValidation(this.group);

    if (key) {
      if (watchKeys && !this._hasValidKeys(this.storedWatchKeys, key)) {
        this.storedWatchKeys.push(key);
      }

      const selectedForm = this.group[key];
      if (selectedForm) {
        /**
         * @description If this condition is true, form by key is changed following onGroupValidation response
         */
        if (
          this._hasValidKeys(watchKeys, currentKey) ||
          this._hasValidKeys(key, currentKey)
        ) {
          selectedForm.setProperties({
            hasError,
            message,
          });
        }

        return this;
      }
    }

    this.storedWatchKeys.forEach((storedWatchKey) => {
      if (this.group[storedWatchKey]) {
        this.group[storedWatchKey].setProperties({
          hasError,
          message,
        });
      }
    });

    return this;
  }

  _executeAllFormValidation = () => {
    if (this.isAllChangeValidation) {
      const hasErrorKeys = Object.keys(this.group).filter(key => this.group[key]
        .runValidation()
        .getValueBy(FORM_PROPERTIES.hasError));

      this.isDisabled = Array.isArray(hasErrorKeys) && hasErrorKeys.length > 0;
      if (this.isDisabled) {
        this._focusRefByKey(hasErrorKeys[0]);
      }
      return this;
    }

    this.isDisabled = Object.values(this.group).some((form) => {
      const isFormHasError = form
        .runValidation()
        .getValueBy(FORM_PROPERTIES.hasError);

      if (isFormHasError) {
        this._focusRefByKey(form.getValueBy(FORM_PROPERTIES.isFocus));
      }
      return isFormHasError;
    });
    return this;
  }

  _focusRefByKey = (name) => {
    if (this.refs && name) {
      const selectedRef = this.refs[name];
      if (selectedRef) {
        if (this.refs) {
          selectedRef.focus();
          return this;
        }
      }

      if (this.group && this.group[[name]]) {
        this.group[name].focusFormRef(selectedRef);
        return this;
      }
    }
    return this;
  }

  setRefs = (refs, isOverride) => {
    if (isOverride || (refs && !this.refs)) {
      this.refs = refs;
    }
    return this;
  };

  getFormByName = name => this.group[name]

  getFormGroupValues = () => Object.keys(this.group).reduce((obj, key) => ({
    ...obj,
    [key]: {
      ...this.group[key].getValues(),
    },
  }), {});

  runAllFormValidation = () => this._executeAllFormValidation()
}

export default FormGroupBuilder;
