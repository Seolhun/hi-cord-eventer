import React from 'react';

import FormBuilder from './FormBuilder';

class FormInput extends React.Component {
  render() {
    return (
      <input {...this.props} ref='email' />
    )
  }
}

const INITIAL_PROPS = {
  value: 'demo@ab180.co',
  htmlFor: 'email',
  requiredMessage: 'required',
  type: 'text'
}

const buildForm = (props, options) => new FormBuilder({
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
      const form = new FormBuilder();
    } catch (error) {
      expect(error.message).toBe('htmlFor property is required, Set unique name to use Form key');
    }
  })

  it('should build given invalid props type', () => {
    try {
      const form = buildForm({ htmlFor: 1000 });
    } catch (error) {
      expect(error.message).toBe('Properties types are not right');
    }

    try {
      const form = buildForm({ onValidation: 'invalid' });
    } catch (error) {
      expect(error.message).toBe('Properties types are not right');
    }

    try {
      const form = buildForm({ }, { onGroupValidationBy: false });
    } catch (error) {
      expect(error.message).toBe('Properties types are not right');
    }
  })

  it('should matched custom props and option values with onValidation', () => {
    try {
      const form = new FormBuilder({ onValidation: () => true });
    } catch (error) {
      expect(error.message).toBe('onValidation properties must return { hasError: boolean, message: string }');
    }
  })

  it('should matched default props value with default props and options with required htmlFor', () => {
    const form = new FormBuilder({ htmlFor: 'email' });
    expect(form).toHaveProperty('value', '');
    expect(form).toHaveProperty('htmlFor', 'email');
    expect(form).toHaveProperty('isRequired', false);
    expect(form).toHaveProperty('isFocus', false);
    expect(form).toHaveProperty('hasError', false);
    expect(form).toHaveProperty('requiredMessage', '');
    expect(form).toHaveProperty('type', INITIAL_PROPS.type);
    expect(form.onValidation()).toEqual({
      hasError: false,
      message: '',
    })
    // options
    expect(form).toHaveProperty('isOnCreatedValidation', false);
    expect(form).toHaveProperty('isOnChangeValidation', true);
    expect(form.onGroupValidationBy()).toEqual({
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
    expect(form).toHaveProperty('value', INITIAL_PROPS.value);
    expect(form).toHaveProperty('htmlFor', INITIAL_PROPS.htmlFor);
    expect(form).toHaveProperty('isRequired', true);
    expect(form).toHaveProperty('isFocus', true);
    expect(form).toHaveProperty('hasError', true);
    expect(form).toHaveProperty('requiredMessage', INITIAL_PROPS.requiredMessage);
    expect(form).toHaveProperty('type', INITIAL_PROPS.type);
    expect(form.onValidation()).toEqual({
      hasError: true,
      message: 'Default Error',
    })
    // options
    expect(form).toHaveProperty('isOnCreatedValidation', true);
    expect(form).toHaveProperty('isOnChangeValidation', false);
    expect(form.onGroupValidationBy()).toEqual({
      hasError: false,
      message: '',
    })
  })

  it('should matched given props validation when isOnCreatedValidation(constructor) is true', () => {
    const form = buildForm({ value: 'error' }, { isOnCreatedValidation: true });
    expect(form.getValueBy('hasError')).toBe(true);
    expect(form.getValueBy('message')).toBe('includedError');
  })

  it('should matched given props validation when isOnCreatedValidation(constructor) is false', () => {
    const form = buildForm({ value: 'error' });
    expect(form.getValueBy('hasError')).toBe(false);
    expect(form.getValueBy('message')).toBe('');
  })

  it('should matched validation based on changing value when isOnChangeValidation is true with setValue()', () => {
    const form = buildForm();

    form.setValue('AB180');
    expect(form.value).toBe('AB180');

    form.setValue('error');
    expect(form.getValueBy('hasError')).toBe(true);
    expect(form.getValueBy('message')).toBe('includedError');
  })

  it('should matched validation based on changing value when isOnChangeValidation is false with setValue()', () => {
    const form = buildForm({}, { isOnChangeValidation: false });

    form.setValue('AB180');
    expect(form.value).toBe('AB180');

    form.setValue('error');
    expect(form.getValueBy('hasError')).toBe(false);
    expect(form.getValueBy('message')).toBe('');
  })

  it('should matched validation based on changing value when isOnChangeValidation is false with setValue() and setRef()', () => {
    const form = buildForm({}, { isOnChangeValidation: false });

    const wrapper = mount((
      <FormInput
        type={form.getValueBy('type')}
        value={form.getValueBy('value')}
        readOnly
      />
    ));
    const formRef = wrapper.ref('email');

    form.setValue('AB180', formRef);
    expect(form.value).toBe('AB180');
    expect(form.ref).toEqual(formRef);

    form.setValue('error', formRef);
    expect(form.getValueBy('hasError')).toBe(false);
    expect(form.getValueBy('message')).toBe('');
    expect(form.ref).toEqual(formRef);
  })

  it('should matched validation based on changing value when isOnChangeValidation is true with setProperties()', () => {
    const form = buildForm();

    form.setProperties({
      value: 'AB180',
    });
    expect(form.value).toBe('AB180');

    form.setProperties({
      value: 'error',
    });
    expect(form.getValueBy('hasError')).toBe(true);
    expect(form.getValueBy('message')).toBe('includedError');
  })

  it('should matched validation based on changing value when isOnChangeValidation is false with setProperties()', () => {
    const form = buildForm({}, { isOnChangeValidation: false });

    form.setProperties({
      value: 'AB180',
    });
    expect(form.value).toBe('AB180');

    form.setProperties({
      value: 'error',
    });
    expect(form.getValueBy('hasError')).toBe(false);
    expect(form.getValueBy('message')).toBe('');
  })

  it('should matched given props and getValues()', () => {
    const form = buildForm();
    expect(form.getValueBy('value')).toBe(INITIAL_PROPS.value);
    expect(form.getValueBy('htmlFor')).toBe(INITIAL_PROPS.htmlFor);
    expect(form.getValueBy('isRequired')).toBe(true);
    expect(form.getValueBy('isFocus')).toBe(true);
    expect(form.getValueBy('requiredMessage')).toBe(INITIAL_PROPS.requiredMessage);
    expect(form.getValueBy('type')).toBe(INITIAL_PROPS.type);
  })

  it('should matched given props and getValueBy(valueKey)', () => {
    const values = buildForm().getValues();
    expect(values).toHaveProperty('value', INITIAL_PROPS.value);
    expect(values).toHaveProperty('htmlFor', INITIAL_PROPS.htmlFor);
    expect(values).toHaveProperty('isRequired', true);
    expect(values).toHaveProperty('isFocus', true);
    expect(values).toHaveProperty('requiredMessage', INITIAL_PROPS.requiredMessage);
    expect(values).toHaveProperty('type', INITIAL_PROPS.type);
  })

  it('should matched validation', () => {
    const form = buildForm().runValidation();
    expect(form.getValueBy('hasError')).toBe(false);
    expect(form.getValueBy('message')).toBe('');

    form.runValidation('error');
    expect(form.getValueBy('hasError')).toBe(true);
    expect(form.getValueBy('message')).toBe('includedError');
  })

  it('should matched validation based on changing value when isOnChangeValidation is false with runValidation()', () => {
    const form = buildForm({}, { isOnChangeValidation: false });

    form.setValue('AB180');
    expect(form.value).toBe('AB180');

    form.setValue('error');
    expect(form.getValueBy('hasError')).toBe(false);
    expect(form.getValueBy('message')).toBe('');

    form.runValidation();
    expect(form.getValueBy('hasError')).toBe(true);
    expect(form.getValueBy('message')).toBe('includedError');

    form.setValue('').runValidation();
    expect(form.getValueBy('hasError')).toBe(true);
    expect(form.getValueBy('message')).toBe('required');
  })

  it('should matched default onValidation()', () => {
    const form = new FormBuilder({ htmlFor: 'email' });
    expect(form).toHaveProperty('value', '');

    const validation = form.onValidation();
    expect(validation).toHaveProperty('hasError', false);
    expect(validation).toHaveProperty('message', '');
  })

  it('should matched custom onValidation()', () => {
    const form = buildForm({ value: 'error' });
    expect(form).toHaveProperty('value', 'error');

    const validation = form.onValidation('error');
    expect(validation).toHaveProperty('hasError', true);
    expect(validation).toHaveProperty('message', 'includedError');
  })

  it('should matched setRef() and component Ref', () => {
    const form = buildForm();

    const wrapper = mount((
      <FormInput
        type={form.getValueBy('type')}
        value={form.getValueBy('value')}
        readOnly
      />
    ));
    const formRef = wrapper.ref('email');
    form.setRef(formRef);
    expect(form.ref).toEqual(formRef);

    const newWrapper = mount((
      <FormInput
        type='search'
        value={form.getValueBy('value')}
        readOnly
      />
    ));
    const newFormRef = newWrapper.ref('email');
    form.setRef(newFormRef, true);
    expect(form.ref).toEqual(newFormRef);
  })

  it('should matched setRef() & focusFormRef()', () => {
    const form = buildForm();

    const wrapper = mount((
      <FormInput
        type={form.getValueBy('type')}
        value={form.getValueBy('value')}
        readOnly
      />
    ));
    const formRef = wrapper.ref('email');
    form.setRef(formRef).focusFormRef();
    const focusedElement = document.activeElement.outerHTML;
    expect(wrapper.html()).toEqual(focusedElement);
  })
})
