import { useContext } from "react"
import { MessageContext } from "../../pages/messages"

function useMessage() {
    const { currentMessage, setCurrentMessage, type, scrollToBottom } = useContext(MessageContext)

    const isEditing = currentMessage.isEditing
    const id = currentMessage.id
    const body = currentMessage.body
    const lastMessageBody = currentMessage.lastMessageBody

    const setIsEditing = (id, body) => setCurrentMessage({body: body, lastMessageBody: body, id: id, isEditing: true})
    const clear = () => setCurrentMessage({
        id: null,
        isEditing: false,
        lastMessageBody: "",
        body: ""
    })
    const setBody = (body) => setCurrentMessage({...currentMessage, body: body})

    return { currentMessage, setCurrentMessage, isEditing, id, body, setBody, setIsEditing, clear, type, lastMessageBody, scrollToBottom }
}

export default useMessage