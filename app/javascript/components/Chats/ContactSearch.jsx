import React from "react";
import Search from "./Search";
import Contacts from "./Contacts";
import Scrollable from "../Containers/Scrollable";

const SearchMessage = ({ children }) => (
  <h2 className="text-center text-sm text-gray-500">{children}</h2>
);

function Loading() {
  return (
    <SearchMessage>We are searching for contacts, please wait</SearchMessage>
  );
}
function NotFound() {
  return <SearchMessage>Sorry, we couldn't find any contacts</SearchMessage>;
}
function SearchResult({ contacts, loading }) {
  if (loading) return <Loading />;
  if (!contacts.length) return <NotFound />;

  return (
    <Scrollable>
      <h2 className="text-md p-2 text-gray-700 mb-2">Contacts</h2>
      <Contacts contacts={contacts} />
    </Scrollable>
  );
}
function ContactResults({ contacts, loading, searchTerm, setSearchTerm }) {
  console.count("ContactResults render");

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {searchTerm && <SearchResult contacts={contacts} loading={loading} />}
    </>
  );
}

export default ContactResults;
