import React, { useContext, useState } from "react";
import Contact from "./Cards/Contact";
import { ChatName } from "./Chat";

function Contacts({ contacts }) {
  return (
    <>
      <ChatName>Contacts</ChatName>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </>
  );
}

export default Contacts;
