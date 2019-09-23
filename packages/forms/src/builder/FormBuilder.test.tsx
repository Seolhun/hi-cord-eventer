import FormBuilder from './FormBuilder';

const INITIAL_PROPS = {
  value: 'demo@hi-cord.co',
  htmlFor: 'email',
  requiredMessage: 'required',
  type: 'text'
}

const buildForm = (props = {}, options = {}) => new FormBuilder({
  ...INITIAL_PROPS,
  isRequired: true,
  isFocus: true,
  onValidation: (value) => {
    if (`${value}`.includes('error')) {
      return {
        hasError: true,
        message: 'includedError',
      };
    }
    return {
      hasError: false,
      message: '',
    };
  },
  ...props,
}, {
  isOnCreatedValidation: false,
  isOnChangeValidation: true,
  ...options,
});

describe('FormBuilder Test', () => {
  it('should matched default props and option values without args', () => {
    try {
      const form = new FormBuilder({}, {});
    } catch (error) {
      expect(error.message).toBe('htmlFor property is required, Set unique name to use Form key');
    }
  })

  it('should build given invalid props type', () => {
    try {
      const form = buildForm({ htmlFor: 1000 }, {});
    } catch (error) {
      expect(error.message).toBe('Properties types are not right');
    }

    try {
      const form = buildForm({ onValidation: 'invalid' }, {});
    } catch (error) {
      expect(error.message).toBe('Properties types are not right');
    }

    try {
      const form = buildForm({ }, { handleOnValidation: false });
    } catch (error) {
      expect(error.message).toBe('Properties types are not right');
    }
  })

  it('should matched custom props and option values with onValidation', () => {
    try {
      const form = new FormBuilder({ onValidation: () => true }, {});
    } catch (error) {
      expect(error.message).toBe('onValidation properties must return { hasError: boolean, message: string }');
    }
  })

  it('should matched default props value with default props and options with required htmlFor', () => {
    const form = new FormBuilder({ htmlFor: 'email' }, {});
    expect(form.getProperties()).toHaveProperty('value', '');
    expect(form.getProperties()).toHaveProperty('htmlFor', INITIAL_PROPS.htmlFor);
    expect(form.getProperties()).toHaveProperty('isRequired', false);
    expect(form.getProperties()).toHaveProperty('isFocus', false);
    expect(form.getProperties()).toHaveProperty('hasError', false);
    expect(form.getProperties()).toHaveProperty('requiredMessage', '');
    expect(form.getProperties()).toHaveProperty('type', INITIAL_PROPS.type);
    expect(form.handleOnValidation().getValidation()).toEqual({
      hasError: false,
      message: '',
    })
    // options
    expect(form.options).toHaveProperty('isOnCreatedValidation', false);
    expect(form.options).toHaveProperty('isOnChangeValidation', false);
    expect(form.handleOnValidation().getValidation()).toEqual({
      hasError: false,
      message: '',
    })
  })

  it('should matched default props value with custom props and options', () => {
    const form = buildForm({
      onValidation: () => ({
        hasError: true,
        message: 'Default Error'
      })
    }, {
      isOnCreatedValidation: true,
      isOnChangeValidation: false,
    });

    // props
    expect(form.getProperties()).toHaveProperty('value', INITIAL_PROPS.value);
    expect(form.getProperties()).toHaveProperty('htmlFor', INITIAL_PROPS.htmlFor);
    expect(form.getProperties()).toHaveProperty('isRequired', true);
    expect(form.getProperties()).toHaveProperty('isFocus', true);
    expect(form.getProperties()).toHaveProperty('hasError', true);
    expect(form.getProperties()).toHaveProperty('requiredMessage', INITIAL_PROPS.requiredMessage);
    expect(form.getProperties()).toHaveProperty('type', INITIAL_PROPS.type);
    expect(form.handleOnValidation().getValidation()).toEqual({
      hasError: true,
      message: 'Default Error',
    })
    // options
    expect(form.options).toHaveProperty('isOnCreatedValidation', true);
    expect(form.options).toHaveProperty('isOnChangeValidation', false);
  })

  it('should matched given props validation when isOnCreatedValidation(constructor) is true', () => {
    const form = buildForm({ value: 'error' }, { isOnCreatedValidation: true });
    expect(form.getPropertyValueBy('hasError')).toBe(true);
    expect(form.getPropertyValueBy('message')).toBe('includedError');
  })

  it('should matched given props validation when isOnCreatedValidation(constructor) is false', () => {
    const form = buildForm({ value: 'error' }, {});
    expect(form.getPropertyValueBy('hasError')).toBe(false);
    expect(form.getPropertyValueBy('message')).toBe('');
  })

  it('should matched validation based on changing value when isOnChangeValidation is true with setValue()', () => {
    const form = buildForm({}, {});

    form.setValue('hi-cord');
    expect(form.getPropertyValueBy('value')).toBe('hi-cord');

    form.setValue('error');
    expect(form.getPropertyValueBy('hasError')).toBe(true);
    expect(form.getPropertyValueBy('message')).toBe('includedError');
  })

  it('should matched validation based on changing value when isOnChangeValidation is false with setValue()', () => {
    const form = buildForm({}, { isOnChangeValidation: false });

    form.setValue('hi-cord');
    expect(form.getPropertyValueBy('value')).toBe('hi-cord');

    form.setValue('error');
    expect(form.getPropertyValueBy('hasError')).toBe(false);
    expect(form.getPropertyValueBy('message')).toBe('');
  })

  it('should matched validation based on changing value when isOnChangeValidation is false with setValue() and setRef()', () => {
    const form = buildForm({}, { isOnChangeValidation: false });
    form.setValue('hi-cord');
    expect(form.getValues().value).toBe('hi-cord');

    form.setValue('error');
    expect(form.getPropertyValueBy('hasError')).toBe(false);
    expect(form.getPropertyValueBy('message')).toBe('');
  })

  it('should matched validation based on changing value when isOnChangeValidation is true with setProperties()', () => {
    const form = buildForm();

    form.setProperties({
      value: 'hi-cord',
    });
    expect(form.getPropertyValueBy('value')).toEqual('hi-cord');
    form.setProperties({
      value: 'error',
    });
    expect(form.getPropertyValueBy('hasError')).toEqual(false);
    expect(form.getPropertyValueBy('message')).toEqual('');
  })

  it('should matched validation based on changing value when isOnChangeValidation is false with setProperties()', () => {
    const form = buildForm({}, { isOnChangeValidation: false });

    form.setProperties({
      value: 'hi-cord',
    });
    expect(form.getPropertyValueBy('value')).toEqual('hi-cord');

    form.setProperties({
      value: 'error',
    });
    expect(form.getPropertyValueBy('hasError')).toEqual(false);
    expect(form.getPropertyValueBy('message')).toEqual('');
  })

  it('should matched given props and getValues()', () => {
    const form = buildForm();
    expect(form.getPropertyValueBy('value')).toBe(INITIAL_PROPS.value);
    expect(form.getPropertyValueBy('htmlFor')).toBe(INITIAL_PROPS.htmlFor);
    expect(form.getPropertyValueBy('isRequired')).toBe(true);
    expect(form.getPropertyValueBy('isFocus')).toBe(true);
    expect(form.getPropertyValueBy('requiredMessage')).toBe(INITIAL_PROPS.requiredMessage);
    expect(form.getPropertyValueBy('type')).toBe(INITIAL_PROPS.type);
  })

  it('should matched given props and getPropertyValueBy(valueKey)', () => {
    const values = buildForm().getValues();
    expect(values).toHaveProperty('value', INITIAL_PROPS.value);
    expect(values).toHaveProperty('hasError', false);
    expect(values).toHaveProperty('message', '');
  })

  it('should matched validation', () => {
    const form = buildForm().handleOnValidation()
    expect(form.getPropertyValueBy('hasError')).toBe(false);
    expect(form.getPropertyValueBy('message')).toBe('');

    form.handleOnValidation('error');
    expect(form.getPropertyValueBy('hasError')).toBe(true);
    expect(form.getPropertyValueBy('message')).toBe('includedError');
  })

  it('should matched validation based on changing value when isOnChangeValidation is false with runValidation()', () => {
    const form = buildForm({}, { isOnChangeValidation: false });

    form.setValue('hi-cord');
    expect(form.getPropertyValueBy('value')).toBe('hi-cord');

    form.setValue('error');
    expect(form.getPropertyValueBy('hasError')).toBe(false);
    expect(form.getPropertyValueBy('message')).toBe('');

    form.handleOnValidation();
    expect(form.getPropertyValueBy('hasError')).toBe(true);
    expect(form.getPropertyValueBy('message')).toBe('includedError');

    form.setValue('').handleOnValidation();
    expect(form.getPropertyValueBy('hasError')).toBe(true);
    expect(form.getPropertyValueBy('message')).toBe('required');
  })

  it('should matched default handleOnValidation()', () => {
    const form = new FormBuilder({ htmlFor: 'email' }, {});
    expect(form.getProperties()).toHaveProperty('value', '');

    const validation = form.handleOnValidation().getValidation();
    expect(validation).toHaveProperty('hasError', false);
    expect(validation).toHaveProperty('message', '');
  })

  it('should matched custom handleOnValidation()', () => {
    const form = buildForm({ value: 'error' });
    expect(form.getProperties()).toHaveProperty('value', 'error');

    const validation = form.handleOnValidation('error').getValidation();
    expect(validation).toHaveProperty('hasError', true);
    expect(validation).toHaveProperty('message', 'includedError');
  })
})
