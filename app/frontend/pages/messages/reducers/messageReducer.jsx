function messageReducer(messages, action) {
    switch (action.type) {
        case 'update': {
            if (messages.findIndex(m => m.id === action.payload.id) == -1) {
                return [action.payload, ...messages]
            }
            return messages.map(m => {
                if (m.id === action.payload.id) {
                    return action.payload;
                } else {
                    return m;
                }
            });
        }
    }
}

export default messageReducer