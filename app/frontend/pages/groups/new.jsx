import { useState } from "react";
import AppLayout from "../../components/Layouts/AppLayout";
import Layout from "../../components/Layouts/Layout";
import TextField from "../../components/Forms/Fields/TextField";
import ImageUploadField from "../../components/Forms/Fields/ImageUploadField";
import { api } from "../../lib/Api";
import { jsRoutes } from "../../lib/paths";
import { usePage } from "@inertiajs/react";
import Button from "../../components/ui/Button";
import Pod from "../../components/ui/Pod";
import SplitWrapped from "../../components/ui/SplitWrapped";
import Search, { Loading, NotFound } from "../chats/components/Search";
import { useDebouncedGet } from "../../components/hooks/useDebouncedGet";
import Scrollable from "../../components/Containers/Scrollable";
import { Action } from "../chats/components/Action";
import Name from "../chats/components/ui/Name";
import IconButton from "../../components/ui/IconButton";
import Avatar from "../../components/ui/Avatar";
import HtmlParser from "react-html-parser";
import Title, { Header } from "../../components/ui/Title";

const DEFAULT_AVATAR = "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"

function Group ({group, onJoinClick}) {
  const { current_user } = usePage().props

  const joined = group.participants.some(p => p.id = current_user.id )
  return (<div className="flex items-center justify-between">
    <Action>
      <Avatar
        avatar={group.avatar_image}
        className="size-12"
        alt="group avatar"
      />
      <Name name={HtmlParser(group.pg_search_highlight)} />
     
    </Action>
     {!joined && <IconButton className="p-2 bg-green-400 text-white rounded-md" onClick={() => onJoinClick(group.id)}> 
        Join
      </IconButton>}
  </div>
  )
}
function Result({ searchTerm, loading, errors, groups, onJoinClick }) {
  if (!searchTerm) return
  if (loading) return <Loading />;

  if (errors.message) return <NotFound />;

  return (
    <Scrollable>
      {groups.map((group) => (
        <Group key={group.id} group={group} onJoinClick={onJoinClick}/>
      ))}
    </Scrollable>
  );
}

function NewGroup() {
  const { authenticity } = usePage().props

  const [groupName, setGroupName] = useState("")
  const [avatar, setAvatar] = useState({
    file: null,
    url: DEFAULT_AVATAR
  })

  const [searchTerm, setSearchTerm] = useState("");

  const [groups, groupsLoading, errors] = useDebouncedGet({
    key: "search-group:" + searchTerm,
    query: searchTerm,
    fn: jsRoutes.searchGroupsPath,
  });

  const handelonchange = (e) => {
    const file = e.target.files[0];
    if(file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar({file: file, url: reader.result});
        }
        reader.readAsDataURL(file);
    }
  }
  const [ processing, setProccesing ] = useState(false)
  const onSubmit = (e) => {
    e.preventDefault();

    if (!groupName) return

    setProccesing(true)
    const formData = new FormData();
        formData.append("group_chat[name]", groupName);
        formData.append("group_chat[avatar_image]", avatar.file);
     
    
    api.post({
        path: jsRoutes.chatGroupsPath(),
        authenticityToken: authenticity.csrf_token,
        body: formData,
        method: "POST",
        formData: true
      })
      .then(() => {
       setProccesing(false)
    });
  };
  const onJoinClick = (id) => {
    setProccesing(true)

     api.post({
        path: jsRoutes.joinGroupPath(id),
        authenticityToken: authenticity.csrf_token,
        method: "POST",
      })
      .then(() => {
       setProccesing(false)
    });
  }
 
  return (<>
    <SplitWrapped>
    
       <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder="You can find groups here"
      />
      <Result
        searchTerm={searchTerm}
        loading={groupsLoading}
        groups={groups}
        errors={errors}
        onJoinClick={onJoinClick}
      />
      <Title text="Create"/>
      <form className="flex flex-col grow-1" onSubmit={onSubmit}>
        <ImageUploadField avatar={avatar.url} label="Group avatar" onChange={handelonchange}/>
        <TextField
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter a group name"
            name="group_name"
            label="Group name"
            value={groupName}
            maxlength={20}
            required
          />
        <div className="flex justify-end items-center">
                <Button className="w-sm" type="submit" color="blue">
                { processing ? "Saving" : "Save" }
            </Button>
        </div>        
      </form>
    </SplitWrapped>
    <Pod title="New Group" heading="Here you can create or join a group"/>
  </>
   
  )
}
NewGroup.layout = (page) => {
  return (
    <Layout title="Groups">
      <AppLayout children={page} />
    </Layout>
  );
};

export default NewGroup