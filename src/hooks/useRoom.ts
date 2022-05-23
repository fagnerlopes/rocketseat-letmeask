import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type QuestionType = {
  id: string;
  author: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
  likeCount: number;
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
  likeId: string | undefined;
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
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
    content: string;
    isHighlighted: boolean;
    isAnswered: boolean;
  }
>;

export function useRoom(roomId: string) {
  const { user } = useAuth();
  if (!roomId) {
    throw new Error("Room ID don't can be empty or null");
  }
  const [questionItems, setQuestionItems] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState<string>("");
  const [authorId, setAuthorId] = useState<string>("");

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
            likeCount: Object.values(value.likes ?? {}).length,
            likeId: Object.entries(value.likes ?? {}).find(
              ([key, like]) => like.authorId === user?.id
            )?.[0],
          };
        }
      );
      setAuthorId(databaseRoom.authorId);
      setTitle(databaseRoom.title);
      setQuestionItems(parseQuestions);

      return () => {
        roomRef.off("value");
      };
    });
  }, [roomId, user?.id]);

  return { questionItems, title, authorId };
}
