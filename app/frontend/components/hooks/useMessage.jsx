import { useContext } from "react"
import { MessageContext } from "../../pages/messages"

function useMessage() {
    const { currentMessage, setCurrentMessage, type } = useContext(MessageContext)

    const isEditing = currentMessage.isEditing
    const id = currentMessage.id
    const body = currentMessage.body

    const setIsEditing = (id, body) => setCurrentMessage({body: body, id: id, isEditing: true})
    const clear = () => setCurrentMessage({
        id: null,
        isEditing: false,
        body: ""
    })
    const setBody = (body) => setCurrentMessage({...currentMessage, body: body})

    return { currentMessage, setCurrentMessage, isEditing, id, body, setBody, setIsEditing, clear, type }
}

export default useMessage