import { useState, Suspense } from "react";
import { usePage } from "@inertiajs/react";
import AppLayout from "../../components/Layouts/AppLayout";
import Layout from "../../components/Layouts/Layout";
import Contacts from "./components/Contacts";
import Welcome from "../../components/ui/Welcome";
import Search, { NotFound } from "./components/Search";
import Scrollable from "../../components/Containers/Scrollable";
import Pod from "../../components/ui/Pod";
import SplitWrapped from "../../components/ui/SplitWrapped";

const filterData = (data, condition) => {
  return data.toLowerCase().indexOf(condition.toLocaleLowerCase())  !== -1
}
export const Chats = ({chats, group_chats }) => {
  const { current_user } = usePage().props;
  const [chatContacts, setChatContacts] = useState(chats);
  const [groupChats, setGroupChats] = useState(group_chats);

  const [searching, setSearching] = useState({
    status: false,
    term: "",
  });

  const filteredContacts = chatContacts.filter(
    (chat) => filterData(chat?.recipient?.username, searching.term)
  );
  const filteredGroups = groupChats.filter(
    (chat) => filterData(chat.name, searching.term)
  );

  const favorite =
    !searching.term &&
    chatContacts.find((chat) => chat?.recipient?.id == current_user.id);

  const filterResult = searching.term && !filteredContacts.length && !filteredGroups.length&& (
    <NotFound />
  );
  const welcome = chats.length == 1 && !searching.term && (
    <Welcome currentUser={current_user} />
  );
  const contacts = searching.term ? filteredContacts : chatContacts.filter(chat => chat?.recipient?.id != current_user.id);
  const groups = searching.term ? filteredGroups : groupChats;

  return (
      <div className="w-full h-full lg:pr-2 lg:px-4 overflow-scroll scrollable overflow-x-hidden lg:pb-12">
        <Search
          searchTerm={searching.term}
          setSearchTerm={(searchTerm) =>
            setSearching({ status: true, term: searchTerm })
          }
          placeholder="Search Conversations"
        />
        <Scrollable>
          {filterResult}
          <Contacts favorite={favorite} groupChats={groups} chats={contacts} />
          <div>
              {welcome}
          </div>
        </Scrollable>
      </div>
  );
}
export default function index({chats, group_chats }) {
  return (<>
    <SplitWrapped>
       <Chats chats={chats} group_chats={group_chats}/>
    </SplitWrapped>
  
   <Pod title="Flash" heading="Connect with your friends"/>
  </>)
}


index.layout = (page) => {
  return (
    <Layout title="Chats">
      <AppLayout children={page} />
    </Layout>
  );
};
