import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";

import "../assets/css/room.scss";
import { Question } from "../components/Question";
import { FormEvent, useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { RoomCode } from "../components/RoomCode";
import { toast } from "react-toastify";

type RoomParams = {
  id: string;
};

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

export function Room() {
  const params = useParams<RoomParams>();
  const { user, signInWithGoogle } = useAuth();

  const [newQuestion, setNewQuestion] = useState("");
  const [questionItems, setQuestionItems] = useState<Question[]>([]);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    const roomRef = database.ref(`rooms/${params.id}`);

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
  }, [params.id]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    if (!user) {
      toast.error("You need are logged!");
      return;
    }

    let questionRef = database.ref(`rooms/${params.id}/questions`);

    const result = await questionRef.push({
      content: newQuestion,
      author: {
        id: user?.id,
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    });

    if (!result.key) {
      toast.error("There was an error sending the question!");
    }

    toast.success("Message has been sent!");
    setNewQuestion("");

    handleGetQuestions();
  }

  async function handleGetQuestions() {
    let questions = await (
      await database.ref(`rooms/${params.id}/questions`).get()
    ).exportVal();
    console.log(questions);
    setQuestionItems(questions);
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={params.id || "No code"} />
          </div>
        </div>
      </header>

      <main className="content">
        <section className="room-title">
          <h1>{`Sala ${title} Q&A`}</h1>
          {questionItems.length > 0 && (
            <span>{`${questionItems.length} pergunta(s)`}</span>
          )}
        </section>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name ?? ""} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta,{" "}
                <button type="button">faça login.</button>
              </span>
            )}

            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {/* Única maneira de percorrer um array em JSX */}
        <div className="question-list">
          {questionItems.map((item) => {
            return (
              <Question
                key={item.id}
                content={item.content}
                author={item.author}
              ></Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
