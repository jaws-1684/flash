import Layout from "../../components/Layouts/Layout";
import AppLayout from "../../components/Layouts/AppLayout";
import { useRef, useState } from "react";
import { getPasswordErrors } from "../../components/Forms/Errors/getPasswordErrors";
import { api } from "../../lib/Api";
import { usePage } from "@inertiajs/react";
import Button from "../../components/ui/Button";
import Title from "../../components/ui/Title";
import EmailField from "../../components/Forms/Fields/EmailField";
import TextField from "../../components/Forms/Fields/TextField";
import PasswordField from "../../components/Forms/Fields/PasswordField";
import { jsRoutes } from "../../lib/paths";
import Avatar from "../../components/ui/Avatar";

function Settings() {
 const { authenticity, current_user } = usePage().props

 const [ data, setData ] = useState({
    email: current_user.email,
    username: current_user.username,
    password: "",
    current_password: "",
    password_confirmation: "",
  });


  const [inputErrors, setInputErrors] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const [ processing, setProccesing ] = useState(false)

  const avatarRef = useRef(null)
  const onSubmit = (e) => {
    e.preventDefault();


    const passwordError = getPasswordErrors(data.password);
    const passwordConfirmationError = getPasswordErrors(
      data.password,
      data.password_confirmation,
      "passwordConfirmation",
    );

    if (passwordError != "") {
      setInputErrors({ ...inputErrors, password: passwordError });
      return;
    } else if (passwordConfirmationError != "") {
      setInputErrors({
        ...inputErrors,
        passwordConfirmation: passwordConfirmationError,
      });
      return;
    }
    setProccesing(true)
    const image = avatarRef.current.files[0]
    const formData = new FormData();
        formData.append("user[password]", data.password);
        formData.append("user[current_password]", data.current_password);
        formData.append("user[password_confirmation]", data.password_confirmation);
        formData.append("user[email]", data.email);
        formData.append("user[username]", data.username);
        formData.append("user[image]", image);
     
    
    api.post({
        path: jsRoutes.userUpdatePath(),
        authenticityToken: authenticity.csrf_token,
        body: formData,
        method: "PATCH",
        formData: true
      })
      .then(() => {
       setProccesing(false)
    });
  };
  return (
    <>
      <Title className="text-center mt-2 text-gray-700" text="Settings" />

      <form onSubmit={onSubmit}>
          <div className="flex gap-4 size-md mb-2">
            <Avatar className="size-24" avatar={current_user.avatar_image} alt="Profile avatar"/>
            <div className="grow-1">
              <label class="block mb-2.5 text-sm font-medium text-heading" for="file_input">Avatar</label>
              <input ref={avatarRef} class="cursor-pointer flex mt-2 w-full border rounded-md py-2 px-3 focus:outline-hidden dark:bg-gray-700/50 dark:border-gray-500 dark:text-gray-300 dark:placeholder-gray-400 dark:focus:ring-2 dark:focus:border-transparent" aria-describedby="file_input_help" id="file_input" type="file"/>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, or JPG.</p>
            </div>
           
          </div>
         
        <EmailField
          onChange={(e) => setData({...data, email: e.target.value })}
          value={data.email}
        />
        <TextField
          onChange={(e) => setData({...data, username: e.target.value })}
          placeholder="Enter your username"
          name="username"
          label="Username"
          value={data.username}
          maxlength={20}
          required
        />
         <PasswordField
          onChange={(e) => setData({...data, current_password: e.target.value })}
          name="current_password"
          value={data.current_password}
          label="Current password"
          error={inputErrors.password}
          required
        />
        <PasswordField
          onChange={(e) => setData({...data, password: e.target.value })}
          name="password"
          value={data.password}
          label="New password"
          error={inputErrors.password}
        />
        <PasswordField
          onChange={(e) => setData({...data, password_confirmation: e.target.value })}
          value={data.password_confirmation}
          name="password_confirmation"
          label="Password confirmation"
          error={inputErrors.passwordConfirmation}
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

export default Settings

Settings.layout = (page) => {
  return (
    <Layout title="Settings">
      <AppLayout children={page} />
    </Layout>
  );
};
