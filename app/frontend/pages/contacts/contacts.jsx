import  { useState } from "react";
import Layout from "../../components/Layouts/Layout";
import AppLayout from "../../components/Layouts/AppLayout";
import { useDebouncedGet } from "../../components/hooks/useDebouncedGet";
import { jsRoutes } from "../../lib/paths";
import Search from "../chats/components/Search";
import { Loading, NotFound } from "../chats/components/Search";
import Contact from "./components/contact";
import Scrollable from "../../components/Containers/Scrollable";
import { ContactBook } from "../../components/Icons/AppIcons";
import Pod from "../../components/ui/Pod";
import SplitWrapped from "../../components/ui/SplitWrapped";

function Result({ searchTerm, loading, contacts }) {
  if (!searchTerm)
    return (
      <div className="flex flex-col items-center justify-center gap-2 mt-1">
        <ContactBook className="size-xs fill-gray-800 mt-14" />
        <div>
          <h1 className="text-5xl font-bold text-gray-800 text-center">
            Find People
          </h1>
          <p className="inline-flex items-center text-xl text-gray-700 text-center">
            Search above to connect with your friends.
          </p>
        </div>
      </div>
    );

  if (loading) return <Loading />;
  if (!contacts.length) return <NotFound />;

  return (
    <Scrollable>
      {contacts.map((contact) => (
        <Contact key={contact.id} contact={contact} />
      ))}
    </Scrollable>
  );
}

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");

  const [contacts, contactsLoading] = useDebouncedGet({
    key: "search:" + searchTerm,
    query: searchTerm,
    fn: jsRoutes.searchPath,
  });

  return (<>
    <SplitWrapped>
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="You can find people here"
      />
      <Result
        searchTerm={searchTerm}
        loading={contactsLoading}
        contacts={contacts}
      />
    </SplitWrapped>
     <Pod title="Contacts" heading="You can find your friends by username here"/>
     </>
  );
}


Contacts.layout = (page) => {
  return (
    <Layout title="Contacts">
      <AppLayout children={page} />
    </Layout>
  );
};
