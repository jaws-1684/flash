import { useRef, useState } from "react";
import AppLayout from "../../components/Layouts/AppLayout";
import Layout from "../../components/Layouts/Layout";
import Title from "../../components/ui/Title";
import TextField from "../../components/Forms/Fields/TextField";
import ImageUploadField from "../../components/Forms/Fields/ImageUploadField";
import { api } from "../../lib/Api";
import { jsRoutes } from "../../lib/paths";
import { usePage } from "@inertiajs/react";
import Button from "../../components/ui/Button";

const DEFAULT_AVATAR = "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar-thumbnail.png"

function NewGroup() {
  const { authenticity } = usePage().props

  const [groupName, setGroupName] = useState("")
  const [avatar, setAvatar] = useState({
    file: null,
    url: DEFAULT_AVATAR
  })
    
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
 
  return (<>
    <Title className="text-center mt-2 text-gray-700" text="Create a group" />
    <form onSubmit={onSubmit}>
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