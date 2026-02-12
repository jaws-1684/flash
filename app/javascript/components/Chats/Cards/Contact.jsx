import React, { useContext } from "react";
import { Avatar } from "../Chat";
import { ActionContainer, ChatName } from "../Chat";
import ReactHtmlParser from "react-html-parser";
import { api } from "../../../lib/Api";
import { router, usePage } from "@inertiajs/react";
import { jsRoutes } from "../../../lib/paths";

function Contact({ contact }) {
  const { authenticity } = usePage().props;

  const onChatClick = async (e) => {
    e.preventDefault();

    let api = new Api();
    const response = await api.post({
      path: jsRoutes.newChatPath(),
      authenticityToken: authenticity.csrf_token,
      body: {
        chat: {
          recipient_id: contact.id,
        },
      },
    });
    if (response) {
      router.visit(jsRoutes.chatMessagesPath(response.chat_id));
    }
  };
  return (
    <ActionContainer onClick={onChatClick}>
      <Avatar avatar={contact.avatar} alt="contact avatar" />
      <ChatName name={ReactHtmlParser(contact.pg_search_highlight)} />
    </ActionContainer>
  );
}

export default Contact;
