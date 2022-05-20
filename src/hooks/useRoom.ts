import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type Question = {
  id: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
};

type FirebaseQuestions = Record<
  string,
  {
    author: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    };
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
  }
>;

export function useRoom(roomId: string) {
  if (!roomId) {
    throw new Error("Room ID don't can be empty or null");
  }
  const [questionItems, setQuestionItems] = useState<Question[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parseQuestions = Object.entries(firebaseQuestions).map(
        ([key, value]) => {
          return {
            id: key,
            content: value.content,
            author: value.author,
            isHighlighted: value.isHighlighted,
            isAnswered: value.isAnswered,
          };
        }
      );
      setTitle(databaseRoom.title);
      setQuestionItems(parseQuestions);
    });
  }, [roomId]);

  return { questionItems, title };
}
