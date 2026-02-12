import { usePage } from "@inertiajs/react";
import ImageContainer from "../ImageContainer";

const messageVariants = {
  base: "message p-2 lg:p-3 rounded-2xl w-3xs lg:w-sm wrap-break-word text-white flex flex-col relative",
  self: "self-end bg-blue-600 dark:bg-blue-700 shadow-lg shadow-blue-700/50",
  foreign:
    "bg-gray-400 dark:bg-gray-700 shadow-lg shadow-gray-400/50 dark:shadow-gray-700/50",
};

export function Message({ message }) {
  const { current_user } = usePage().props;
  const { body, attached_images } = message;

  const classVariant =
    current_user.id == message.user_id
      ? messageVariants.self
      : messageVariants.foreign;
  const className = messageVariants.base.concat(" ", classVariant);

  return (
    <div className={className}>
      {body && <p>{body}</p>}

      <ImageContainer attached_images={attached_images} />
      <p className="self-end text-xs text-gray-800">
        {message.created_at.slice(11, 16) || ""}
      </p>
    </div>
  );
}
