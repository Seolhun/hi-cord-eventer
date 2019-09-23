# FormGroup Builder

각 한개의 필드가 Form이 되며, Form을 기준으로 FormGroup을 만들어 일괄적으로 Form을 관리할 수 있도록 만드는 함수

## Props
```js
export const FORM_GROUP_PROPERTIES = {
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
   * @default { hassError: false, message: '' }
   * @type function
   */
  onGroupValidation: 'onGroupValidation',
};
```

#### isOnCreatedValidation
FormGroupBuilder가 인스턴스화 될 때, 주어진 value와 onValidation 함수를 이용하여 유효성을 검사/적용을 할지 말지를 결정하는 Prop.

#### isOnChangeValidation
Form에 setValue가 호출될 때, 새로 입력되는 value를 기준으로 유효성 검사/적용을 할지 말지를 결정하는 Prop.

#### isAllChangeValidation
FormGroup의 유효성 검사를 실행할 경우, 해당 Group의 모든 Form의 유효성 검사/실행을 할지 말지를 결정하는 Prop.

#### isDisabled
FormGroup의 유효성을 확인하는 prop. 유효성 검사 이후 유효하지 않은 경우 isDisabled가 true로 변경됨.

#### onGroupValidation(group)
FormGroup의 Form들을 서로 비교하는 유효성 검사를 만드는 Prop.

- e.g
```js
  onGroupValidation: (group) => {
    if (
      group.passwordConfirm.value &&
      group.password.value !== group.passwordConfirm.value
    ) {
      return {
        key: 'passwordConfirm',
        watchKeys: ['password'],
        hasError: true,
        message: 'Unmatched password and password confirm',
      };
    }
    return {
      key: '',
      watchKeys: '',
      hasError: false,
      message: '',
    };
  },
```

# Form Builder

각 1개의 필드를 Form value로 만들고, 값을 기준으로 유효성을 확인할 수 있도록 만든 함수

```js
export const FORM_VALUE_PROPERTIES = {
  /**
   * @requires
   * @type string
   */
  key: 'key',
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
   * @default false
   * @type boolean
   */
  isOnCreatedValidation: 'isOnCreatedValidation',
  /**
   * @default true
   * @type boolean
   */
  isOnChangeValidation: 'isOnChangeValidation',
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
};
```

#### value
Form의 값으로 사용하는 필드

#### htmlFor
접근성을 위한 값으로 사용되는 필드, FormGroup의 key값이 존재하지 않을 경우 htmlFor를 이용하여 key값으로 사용.

#### isFocus
유효성 검사시에 문제가 있을 경우 focus를 사용할지에 대한 여부를 나타내는 필드

#### isRequired
반드시 필요한 값인지에 대한 여부를 나타내는 필드.

#### requiredMessage
isRequired가 true일 경우, value 값이 없을 때 나타나는 유효성 검사 메세지 필드.

#### type
기본적으로 'text' 값을 가지며, 관련 form의 type으로 사용되는 필드.

#### isOnCreatedValidation
FormGroupBuilder가 인스턴스화 될 때, 주어진 value와 onValidation 함수를 이용하여 유효성을 검사/적용을 할지 말지를 결정하는 필드.

#### isOnChangeValidation
Form에 setValue가 호출될 때, 새로 입력되는 value를 기준으로 유효성 검사/적용을 할지 말지를 결정하는 필드.

#### onValidation
FormGroup의 유효성 검사를 실행할 경우, 해당 Group의 모든 Form의 유효성 검사/실행을 할지 말지를 결정하는 필드.

- e.g
```js
  onValidation: (value) => {
    const isValidMobile = isMobilePhone(value);
    if (!isValidMobile) {
      return {
        hasError: true,
        message: 'This is not mobile number',
      };
    }
    return {
      hasError: false,
      message: '',
    };
  },
```


## How to use

#### 1. FormGroup에 사용 할 Form Object 함수 선언
함수로 FormObject를 만드는 이유는, 각 View에서 사용되는 props나 state를 할당받기 위함.

```js
const buildAuthFormObject = (props) => ({
  email: {
    htmlFor: 'email',
    isRequired: true,
    isFocus: true,
    requiredMessage: 'Email is required',
    onValidation: (value) => {
      if (!isEmail(value)) {
        return {
          hasError: true,
          message: 'Not email format',
        };
      }
      return {
        hasError: false,
        message: '',
      };
    },
  },
  password: {
    type: 'password',
    htmlFor: 'password',
    isRequired: true,
    isFocus: true,
    requiredMessage: 'Password is required',
    onValidation: (value) => {
      const isOverMinLength = value.length > 7;
      if (!isOverMinLength) {
        return {
          hasError: true,
          message: 'Password is required at least 8 length',
        };
      }
      return {
        hasError: false,
        message: '',
      };
    },
  },
  passwordConfirm: {
    type: 'password',
    htmlFor: 'passwordConfirm',
    isRequired: true,
    isFocus: true,
    requiredMessage: 'Password confirm is required',
    onValidation: (value) => {
      const isOverMinLength = value.length > 7;
      if (!isOverMinLength) {
        return {
          hasError: true,
          message: 'Password Confirm is required at least 8 length',
        };
      }
      return {
        hasError: false,
        message: '',
      };
    },
  },
});
```

#### 2. FormGroup에 사용 할 Form Object 함수 선언
Form Object를 사용하여 Form에 사용 할 필드를 사용하여 FormGroup 생성.

Form Group의 두번째 인자는 FormGroup의 Option Props를 나타내며, 해당 Props를 통해 FormGroup의 기능을 설정 할 수 있음.

```js
export const SignUpFormGroup = (props) => {
  const {
    email,
    password,
    passwordConfirm,
  } = buildAuthFormObject(props);

  return new FormGroupBuilder({
    email,
    password,
    passwordConfirm,
  },
  // Global Options
  {
    isDisabled: false,
    isOnChangeValidation: false,
    isAllChangeValidation: true,
    onGroupValidation: (group) => {
      if (
        group.passwordConfirm.value &&
        group.password.value !== group.passwordConfirm.value
      ) {
        return {
          key: 'passwordConfirm',
          watchKeys: ['password'],
          hasError: true,
          message: 'Unmatched password and password confirm',
        };
      }
      return {
        key: '',
        watchKeys: '',
        hasError: false,
        message: '',
      };
    },
  });
};
```

## 3. React View에서 FormGroup을 사용하기

```jsx
  constructor(props) {
    super(props);
    // 생성자에서 property로 선언 => 해당 FormGroup의 함수를 사용하기 위함(View Model)
    this.signInForm = SignInFormGroup(props);
    /**
     * React는 state가 변경되어야 rendering이 일어나기 때문에, 필요한 FormGroup 값(value, hasError, message)만 state에 할당.
     * */
    this.state = {
      ...this.signInForm.getFormGroupValues(),
    };
  }

  handleChangeInputValue = ({ target: { name, value } }) => {
    // Event target의 value를 setValue하여 state를 변이시킴
    this.setState({
      [name]: this.signInForm.group[name]
        .setValue(value)
        .getValues(),
    });
  }

  // onBlur에 유효성 검사 중인 상황
  handleOnBlur = ({ target: { name, value } }) => {
    // name에 현재 htmlFor를 사용하였고, 현재 htmlFor은 각 Object의 Key 값과 동일하게 사용해야함.
    this.setState({
      [name]: this.signInForm.group[name]
        // setValue의 두번째 인자는 ref를 할당하는 것
        .setValue(value, this.refs[name])
        // 유효성 검사 실행
        .runValidation()
        // 유효성 검사 된 Form 값을 재할당
        .getValues(),
    });
  }

  handleSubmitSignIn = () => {
    const {
      email,
      password,
    } = this.state;

    const validatedForm = this.signInForm
      // Ref가 존재하지 않을 경우만 이를 할당
      .setRefs(this.refs)
      // FormGroup의 유효성 전부를 검사
      .runAllFormValidation();

    if (validatedForm.isDisabled) {
      // 유효하지 않을 경우 유효성 검사된 FormGroupValue 재할당
      this.setState({
        ...validatedForm.getFormGroupValues(),
      });
      return;
    }
    // After Your logic flow
    // ......
  }

  render() {
    return (
      // ...
      <input
        ref={this.state.password.key}
        className={classnames(
          {
            hasError: this.state.password.hasError,
          },
        )}
        name={this.state.password.key}
        onBlur={this.handleOnBlur}
        onChange={this.handleChangeInputValue}
        type={this.state.password.type}
        value={this.state.password.value}
      />
      // ...
    )
  }
```
