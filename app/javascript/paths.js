const railsRoutes = {
    login: "/login",
    signup: "/signup",
    user: "/users/:id",
    userPosts: "/users/:id/posts/:id",
    forgotPassword: "/users/password/new"
}

const jsRoutes = {}

for(const [key, value] of Object.entries(railsRoutes)) {
    jsRoutes[key.concat("", "Path")] = (argument) => {
        if (!argument) {
            return value
        }

        if (typeof argument === "number" || typeof argument === "string" ) {
            return value.replace(/:id/g, argument)
        } else if (Array.isArray(argument)) {
            let i = 0
            const result = value.replace(/:id/g, () => argument[i++]);
            return result
        }
        
    } 
}

export { jsRoutes }