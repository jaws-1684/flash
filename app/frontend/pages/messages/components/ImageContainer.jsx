import Image from "./ui/Image";
import { useState } from "react";

export default function ImageContainer({ attached_images }) {
  if (!attached_images) return;

  const [isExpanded, setIsExpanded] = useState(false);
  const firstImage = attached_images[0];
  const length = attached_images.length;

  let expandButton = (
    <button
      onClick={() => setIsExpanded(true)}
      className="p-4 inline-flex hover:scale-110 items-center justify-center text-lg size-12 bg-gray-400 cursor-pointer rounded-full absolute inset-x-25 lg:inset-x-40 inset-y-10 lg:inset-y-15"
    >
      {attached_images?.length}
    </button>
  );

  let content;
  if (length == 1) {
    content = <Image key={firstImage} src={firstImage} alt="chat image" />;
  } else if (length > 1 && !isExpanded) {
    content = (
      <div className="relative">
        <div className="bg-gray-200 z-50 blur-sm">
          <Image key={firstImage} src={firstImage} alt="chat image" />
        </div>
        {expandButton}
      </div>
    );
  } else if (length > 1 && isExpanded) {
    content = (
      <div className="relative w-full">
        <button
          onClick={() => setIsExpanded(false)}
          className="w-full bg-white/20 absolute rounded-md h-12 inline-flex justify-center items-center cursor-pointer"
        >
          Close
        </button>
        <div className="flex flex-col max-w-sm gap-2">
          {attached_images.map((img) => (
            <Image key={img} src={img} alt="chat image" />
          ))}
        </div>
      </div>
    );
  }

  return content;
}
