import React from 'react'
import CustomForm from '../../components/CustomForm';
import { Columns, Column, Field, Control, Button } from 'bloomer';
import { Link } from 'react-router-dom'
import { isFormValid } from '../../services/formService';
import { useAuth } from '../../providers/AuthProvider';

export default props => {

  const { authState, register } = useAuth()

  const handleSubmit = (data, errors) => {
    // console.log('> received data', data)

    delete data.undefined
    console.log("form")
    console.log(data)
    if (!isFormValid(errors)) {
      register(data)
    }
  }

  let fields = [
    [
      {
        name: 'firstName',
        type: 'text',
        placeholder: 'First Name',
        required: true
      },
      {
        name: 'lastName',
        placeholder: 'Last Name',
        type: 'text',
        required: true,
        error: 'abc'
      },
    ],
    {
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      required: true
    },
    {
      name: 'phone',
      placeholder: 'Phone',
      type: 'text',
      required: true
    },
    [
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        required: true
      },
      {
        name: 'cPassword',
        placeholder: 'Confirm Password',
        type: 'password',
        required: true,
        includeInForm: false,
        confirm: 'password'
      },
    ],
  ]

  return (
    <CustomForm fields={fields} onSubmit={handleSubmit}>
      <Columns>
        <Column isSize="1/2">
          <Field>
            <Control>
              <Button isLoading={authState.loading} type="submit" isOutlined isColor="white">
                Register
                      </Button>
            </Control>
          </Field>
        </Column>
        <Column isSize="1/2" hasTextAlign="left">
          Are you already member? <Link className="has-text-black" to="/auth/login" >Login</Link>
        </Column>
      </Columns>
    </CustomForm>
  )
}