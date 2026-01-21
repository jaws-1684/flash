import React from 'react'
import OmniauthPartial from './OmniauthPartial'
import { Google as GoogleIcon } from '../../Icons/OmniauthIcons'

function Google({authenticity}) {
  return (
    <OmniauthPartial csrf_token={authenticity.csrf_token} provider="google">
        <GoogleIcon/>
    </OmniauthPartial>)
}

export default Google