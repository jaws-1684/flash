import React, {useState} from 'react'
import { useForm } from '@inertiajs/react'
import Auth from '../../components/Auth/Auth'
import Title from '../../components/Title'
import EmailField from '../../components/Forms/Fields/EmailField'
import PasswordField from '../../components/Forms/Fields/PasswordField'
import Link from '../../components/Link'
import Form from '../../components/Forms/Form'
import Button from '../../components/Button'
import Layout from '../../components/Layout'
import ContainerSm from '../../components/Containers/ContainerSm'
import { getPasswordErrors } from '../../components/Forms/Errors/getPasswordErrors'
import Omniauth from '../../components/Forms/Omniauth/Omniauth'

function Signup() {
  const { data, setData, post, transform, errors, processing } = useForm({
    email: "",
    password: "",
    password_confirmation: ""
  })
  

  const [ inputErrors, setInputErrors ] = useState({
      password: "",
      passwordConfirmation: ""
  })

  const onSubmit =(e) => {
    e.preventDefault()

    const passwordError = getPasswordErrors(data.password)
    const passwordConfirmationError = getPasswordErrors(
      data.password, 
      data.password_confirmation, 
      "passwordConfirmation"
    )

    if (passwordError != "") {
      setInputErrors({...inputErrors, password: passwordError})
      return
    } else if (passwordConfirmationError != "") {
      setInputErrors({...inputErrors, passwordConfirmation: passwordConfirmationError})
      return
    }

    post('/signup',  transform((data) => ({
      user: { ...data }
    })))
  }
  return (
   <Layout title='Signup'>
     
      <Auth>
        
        <Title text="Create an account"/>

        <Form onSubmit={onSubmit}>
          <EmailField 
            onChange={(e) => setData('email', e.target.value)} 
            value={data.email}
          />
          <PasswordField 
            onChange={(e) => setData('password', e.target.value)}
            value={data.password}
            error={inputErrors.password}
          />
          <PasswordField 
            onChange={(e) => setData('password_confirmation', e.target.value)}
            value={data.password_confirmation}
            name="password_confirmation" 
            label="Password confirmation"
            error={inputErrors.passwordConfirmation}
          />

          <Button type="submit" color="blue" disabled={processing}>
            Sign up
          </Button>  
        </Form>
        <div class="w-full flex py-2 items-center">
          <div class="flex-grow border-t border-gray-400"></div>
          <span class="flex-shrink mx-4 text-gray-400">Or continue with</span>
          <div class="flex-grow border-t border-gray-400"></div>
        </div>
        <ContainerSm>
         <Omniauth/>
       </ContainerSm>
       
        <ContainerSm>
            <p className='inline dark:text-gray-400 text-gray-700 mr-2'>Already have an account?</p>
            <span>{<Link href="/login" method="get" name="Log in"/>}</span>
        </ContainerSm>

      </Auth>    
   </Layout>  
  )
}

export default Signup

