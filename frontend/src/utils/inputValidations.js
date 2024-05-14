
export const username_validation = {
  name: 'username',
  label: 'Username',
  type: 'text',
  id: 'username',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 10,
      message: '10 characters max',
    },
    pattern: {
      value: /^[a-zA-Z0-9]*$/,
      message: 'only letters and numbers',
    },
  },
}

export const displayname_validation = {
  name: 'displayName',
  label: 'Display Name',
  type: 'text',
  id: 'displayname',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    maxLength: {
      value: 30,
      message: '30 characters max',
    },
  },
}

export const password_validation = {
  name: 'password',
  label: 'Password',
  type: 'password',
  id: 'password',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    minLength: {
      value: 6,
      message: 'min 6 characters',
    },
    pattern: {
     value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
     message: 'must contain upper, lower case letters and numbers',
    },
  },
}

export const c_password_validation = {
  name: 'cPassword',
  label: 'Confirm Password',
  type: 'password',
  id: 'c-password',
 validation: {
        required: {
          value: true,
          message: "required",
        },}

}


export const email_validation = {
  name: 'email',
  label: 'Email',
  type: 'email',
  id: 'email',
  validation: {
    required: {
      value: true,
      message: 'required',
    },
    pattern: {
      value:
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: 'not valid',
    },
  },
}
