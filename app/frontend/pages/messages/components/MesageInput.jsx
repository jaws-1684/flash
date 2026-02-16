import Form from "../../../components/Forms/Form";
import { api } from "../../../lib/Api";
import { usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { jsRoutes } from "../../../lib/paths";
import IconButton from "../../../components/ui/IconButton";
import { ImageUpload, Send } from "../../../components/Icons/AppIcons";

const classVariants = {
  textInput:
    "message-input w-full pl-12 border-0 rounded-full p-3 tracking-tight bg-gray-200 dark:color-white dark:placeholder-gray-400 dark:focus-bg-gray-500 dark:bg-gray-500",
  fileLabel:
    "inline-flex justify-center items-center absolute inset-y-0 start-2 cursor-pointer",
  fileCounter:
    "inline-flex justify-center size-8 items-center absolute inset-y-2 right-2 bg-blue-600 text-white rounded-full p-2",
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
  const [body, setBody] = useState("");
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

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = formatedMessageFormObject(files, body);

    if (!formData) return;

    setIsLoading(true);

    api
      .post({
        path: jsRoutes.chatMessagesPath(chatId),
        authenticityToken: authenticity.csrf_token,
        body: formData,
        formData: true,
      })
      .then(() => {
        setIsLoading(false);
        setFiles([]);
        setBody("");
      });
    messageRef.current.focus();
  };

  const loader = (
    <div className="loader absolute size-8 bottom-12 right-1"></div>
  );
  const fileCounter = (
    <div className={classVariants.fileCounter}>{fileCount}</div>
  );

  return (
    <div className="flex gap-2 mt-2 relative">
      {isLoading && loader}

      <Form className="w-full" onSubmit={onSubmit}>
        <div className="relative w-full">
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
        </div>
      </Form>

      <IconButton
        onClick={onSubmit}
        className="z-50 cursor-pointer hover:scale-120 ease-in-out"
      >
        <Send
          width="2.5rem"
          height="2.5em"
          className="bg-green-600 p-2 rounded-full"
          fill="stroke-white"
        />
      </IconButton>
    </div>
  );
}
