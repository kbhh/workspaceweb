import React, { useState, useEffect } from 'react'
// import AuthLayout from '../../components/Auth/AuthLayout';
import { Control, Input, Field, Button, Checkbox, Columns, Column, Help } from 'bloomer';
import { Link } from 'react-router-dom'
import { useAuth } from '../../providers/AuthProvider';

const Login = (props) => {

  const defaultForm = {
    email: '',
    password: ''
  }

  const [form, setForm] = useState(defaultForm)
  const [remember, setRemember] = useState(false)

  const handleFormChange = (e) => {
    let newForm = { ...form }
    newForm[e.target.name] = e.target.value
    setForm(newForm)
  }

  const { login, authState } = useAuth()
  const handleSubmit = (e) => {


    e.preventDefault()
    login(form, remember)
  }

  useEffect(() => {
    if (authState.loginSuccess) {
      props.history.push('/dashboard')
    }
  }, [authState.loginSuccess, props.history])

  return (
    <form onSubmit={handleSubmit}>
      {authState.error ?
        <Help isColor='danger'>Invalid email or password</Help> : null
      }
      <Field>
        <Control>
          <Input type="email" placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            isColor={authState.error ? 'danger' : ''}
          />
        </Control>
      </Field>
      <Field>
        <Control>
          <Input type="password" placeholder="Password"
            name="password"
            value={form.password}
            isColor={authState.error ? 'danger' : ''}
            onChange={handleFormChange}
          />
        </Control>
      </Field>
      <Field>
        <Control>
          <Checkbox checked={remember} onChange={checked => setRemember({ remember: !remember })}>Remember Me</Checkbox>
        </Control>
      </Field>
      <Columns>
        <Column>
          <Field>
            <Control>
              <Button isActive={!authState.loading} isLoading={authState.loading} type="submit" isColor="white" isOutlined>
                Login
                  </Button>
            </Control>
          </Field>
        </Column>
        <Column>
          Don't have account? <Link to="/auth/register" className="has-text-black" >Register</Link>
        </Column>
      </Columns>
    </form>
  )
}

export default Login