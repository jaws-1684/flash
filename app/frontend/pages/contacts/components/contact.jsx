import Avatar from "../../../components/ui/Avatar";
import { Action } from "../../chats/components/Action";
import Name from "../../chats/components/ui/Name";
import HtmlParser from "react-html-parser";

import { api } from "../../../lib/Api";
import { router, usePage } from "@inertiajs/react";
import { jsRoutes } from "../../../lib/paths";

function Contact({ contact }) {
  const { authenticity } = usePage().props;

  const onChatClick = async (e) => {
    e.preventDefault();

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
    <Action onClick={onChatClick}>
      <Avatar
        avatar={contact.avatar}
        className="size-12"
        alt="contact avatar"
      />
      <Name name={HtmlParser(contact.pg_search_highlight)} />
    </Action>
  );
}

export default Contact;
