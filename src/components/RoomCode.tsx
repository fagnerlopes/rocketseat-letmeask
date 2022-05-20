import copyImg from "../assets/images/copy.svg";

import "../assets/css/room-code.scss";
import { useEffect, useState } from "react";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  const [showClass, setSHowClass] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setSHowClass("");
    }, 3000);
  });

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    showNotifyWhenCopiedToClipbard();
  }

  function showNotifyWhenCopiedToClipbard() {
    setSHowClass(showClass ? "" : "show-notify");
  }

  return (
    <div>
      <button className="room-code" onClick={copyRoomCodeToClipboard}>
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>{props.code}</span>
      </button>
      <div className={`notification ${showClass}`}>Código da sala copiado!</div>
    </div>
  );
}
