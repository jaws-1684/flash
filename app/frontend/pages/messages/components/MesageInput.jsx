import Form from "../../../components/Forms/Form";
import { api } from "../../../lib/Api";
import { usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { jsRoutes } from "../../../lib/paths";
import IconButton from "../../../components/ui/IconButton";
import { ImageUpload, Send } from "../../../components/Icons/AppIcons";
import useMessage from "../../../components/hooks/useMessage";
import { truncate } from "../../../lib/truncate";

const classVariants = {
  textInput:
    "message-input w-full pl-12 border-0 rounded-full p-4 tracking-tight dark:color-white dark:placeholder-gray-400 dark:focus-bg-gray-500 dark:bg-gray-500 bg-gray-200 lg:bg-white",
  fileLabel:
    "inline-flex justify-center items-center absolute inset-y-0 start-4 lg:start-8 cursor-pointer",
  fileCounter:
    "inline-flex justify-center size-2 items-center absolute inset-y-2 left-2 bg-blue-600 text-white rounded-full p-2",
};

const formatedMessageFormObject = (files, body) => {
  if (body || files.length > 0) {
    const data = new FormData();
    data.append("message[body]", body);

    const images = Array.prototype.slice.call(files);
    const imagesToUpload = [];

    images.some((image) => {
      imagesToUpload.push(image);
    });

    imagesToUpload.forEach((image) => data.append(`images[]`, image));
    return data;
  }
  return null;
};

export default function MessageInput({ chatId }) {
  const { body, setBody, id, isEditing, clear, type, lastMessageBody } = useMessage()
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const messageRef = useRef(null);

  const filesUploaded = files.length > 0;
  const fileCount = files.length;
  const { authenticity } = usePage().props;

  useEffect(() => {
    messageRef.current.focus();
  }, [chatId]);


  const onTextInputChange = (e) => setBody(e.target.value);
  const onFileUpload = (e) => setFiles(e.target.files);
  console.log(type)
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = formatedMessageFormObject(files, body);

    if (!formData) return;

    setIsLoading(true);

    api
      .post({
        path: type === "group" ? jsRoutes.groupChatMessagesPath(chatId) : jsRoutes.chatMessagesPath(chatId),
        authenticityToken: authenticity.csrf_token,
        body: formData,
        formData: true,
      })
      .then(() => {
        setIsLoading(false);
        setFiles([]);
        clear();
      });
    messageRef.current.focus();
  };

  const onEditSubmit = (e) => {
    e.preventDefault();
    

    if (!body) return;

    setIsLoading(true);

    api
      .post({
        path: jsRoutes.messagePath(id),
        authenticityToken: authenticity.csrf_token,
        body: { message: { body: body } },
        method: "PATCH"
      })
      .then(() => {
        setIsLoading(false);
        setFiles([]);
        clear()
      });
    messageRef.current.focus();
  };

  const loader = (
    <div className="loader absolute size-8 bottom-12 right-1"></div>
  );
  const fileCounter = (
    <div className={classVariants.fileCounter}>{fileCount}</div>
  );

  const editing = isEditing && (<p className="absolute w-full bottom-18 lg:bottom-24 p-2 pr-10 flex justify-between items-center">
    Editing @{truncate(lastMessageBody, 20)}
    <span className="size-6 text-sm flex justify-center items-center text-gray-700 rounded-full hover:bg-gray-200/50 bg-gray-200 p-2" 
      onClick={() => clear()}>x
      </span>
    </p>)

  return (
    <div className="sticky bottom-0 flex gap-2 relative lg:dark:bg-gray-700 lg:bg-gray-200  p-2 lg:p-4">
      {isLoading && loader}
     
      <Form className="w-full" onSubmit={isEditing ? onEditSubmit : onSubmit}>
         {editing}
        <div className="relative">
            <input
              ref={messageRef}
              onChange={onTextInputChange}
              value={body}
              type="text"
              placeholder="Send a message"
              className={classVariants.textInput}
            />
          </div>
           <label className={classVariants.fileLabel}>
            <input
              onChange={onFileUpload}
              name="message[images]"
              multiple
              type="file"
              accept="image/png, image/jpeg"
              class="hidden"
            />
            <ImageUpload stroke="stroke-blue-700" className="hover:scale-120" width="1.5rem" height="1.5rem" />
          </label>
          
          {filesUploaded && fileCounter}
          <IconButton
          type="submit"
          className="absolute right-4 lg:right-8 inset-y-0 cursor-pointer hover:scale-90 ease-in-out">
             <Send
            width="2.5rem"
            height="2.5em"
            className="bg-blue-600 p-2 rounded-full"
            fill="stroke-white"
          />
          </IconButton>

      </Form>

     
    </div>
  );
}
