import React from 'react'
import Button from '../../ui/Button'

function OmniauthPartial({provider, csrf_token, children}) {
  return (
     <form
  action={"/users/auth/" + provider}
  method="post"
  data-turbo="false"
>
  <input
    type="hidden"
    name="authenticity_token"
    value={csrf_token}
  />

  <Button
    type="submit"
    color="gray"
  >
    <div className='flex gap-2 justify-center items-center'>
        {children}
         <p>
          Continue with {provider[0].toUpperCase() + provider.slice(1)}
        </p>
    </div>
   
  </Button>
</form>)
}

export default OmniauthPartial