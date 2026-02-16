const baseURI = {
  default: "localhost:3000",
  webSocket: `ws://localhost:3100/cable`,
};

const railsRoutes = {
  login: "/login",
  signup: "/signup",
  user: "/users/:id",
  userPosts: "/users/:id/posts/:id",
  forgotPassword: "/users/password/new",
  chatMessages: "/chats/:id/messages",
  search: "/api/search?username=:id",
  newChat: "/chats",
  destroyChat: "/chats/:id",
};

const jsRoutes = {};

for (const [key, value] of Object.entries(railsRoutes)) {
  jsRoutes[key.concat("", "Path")] = (argument) => {
    if (!argument) {
      return value;
    }

    if (typeof argument === "number" || typeof argument === "string") {
      return value.replace(/:id/g, argument);
    } else if (Array.isArray(argument)) {
      let i = 0;
      const result = value.replace(/:id/g, () => {
        if (i > argument.length) return;
        argument[i++];
      });
      return result;
    }
  };
}

export { jsRoutes, baseURI };
