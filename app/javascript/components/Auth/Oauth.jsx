import React from 'react'
import ContinueWithSeparator from '../ContinueWithSeparator'
import ContainerSm from '../Containers/ContainerSm'
import Omniauth from '../Forms/Omniauth/Omniauth'

function Oauth() {
    return <>
    <ContinueWithSeparator/>
        <ContainerSm>
         <Omniauth/>
    </ContainerSm>
    </>
}

export default Oauth