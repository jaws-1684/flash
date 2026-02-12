import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "../../components/Layouts/AppLayout";
import Layout from "../../components/Layouts/Layout";
import Contacts from "./components/Contacts";
import Welcome from "../../components/ui/Welcome";
import Search, { NotFound } from "./components/Search";
import Scrollable from "../../components/Containers/Scrollable";
import Plus from "../../components/Icons/AppIcons";
import IconButton from "../../components/ui/IconButton";
import { router } from "@inertiajs/react";

export default function Chats({ chats }) {
  const { current_user } = usePage().props;
  const [chatContacts, setChatContacts] = useState(chats);

  const [searching, setSearching] = useState({
    status: false,
    term: "",
  });

  const filteredContacts = chatContacts.filter(
    (chat) =>
      chat.name.toLowerCase().indexOf(searching.term.toLocaleLowerCase()) !==
      -1,
  );
  const favorite =
    !searching.term &&
    chatContacts.filter((chat) => chat.name == current_user.username)[0];

  const filterResult = searching.term && !filteredContacts.length && (
    <NotFound />
  );
  const welcome = chats.length < 2 && !searching.term && (
    <Welcome currentUser={current_user} />
  );
  const contacts = searching.term ? filteredContacts : chatContacts;

  return (
    <>
      <Search
        searchTerm={searching.term}
        setSearchTerm={(searchTerm) =>
          setSearching({ status: true, term: searchTerm })
        }
        placeholder="Search Conversations"
      />
      <Scrollable className="h-full">
        {filterResult}
        <Contacts favorite={favorite} chats={contacts} />
        {welcome}
      </Scrollable>

      <div className="relative w-full z-50">
        <IconButton
          className="absolute cursor-pointer bottom-4 end-2 z-50 p-3 bg-logo rounded-full transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
          onClick={() => router.visit("/contacts")}
        >
          <Plus className="size-xs" />
        </IconButton>
      </div>
    </>
  );
}

Chats.layout = (page) => {
  return (
    <Layout title="Chats">
      <AppLayout children={page} />
    </Layout>
  );
};
