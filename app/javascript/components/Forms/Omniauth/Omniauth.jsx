import React from "react";
import Github from "./Github";
import { usePage } from "@inertiajs/react";
import Google from "./Google";
function Omniauth() {
  const { authenticity } = usePage().props;
  return (
    <div className="flex gap-2">
      <Github authenticity={authenticity} />
      <Google authenticity={authenticity} />
    </div>
  );
}

export default Omniauth;
