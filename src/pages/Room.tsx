import { useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import { Button } from "../components/Button";

import "../assets/css/room.scss";
import { Question } from "../components/Question";
import { FormEvent, useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { RoomCode } from "../components/RoomCode";

type RoomParams = {
  id: string;
};

export function Room() {
  const params = useParams<RoomParams>();
  const { user, signInWithGoogle } = useAuth();

  //useEffect(handleInitializeQuestions);

  const [newQuestion, setNewQuestion] = useState("");
  const [questionItems, setQuestionItems] = useState([]);

  async function handleCreateQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      return;
    }

    let questionRef = database.ref(`rooms/${params.id}/questions`);

    await questionRef.push({
      description: newQuestion,
      authorId: user?.id,
    });

    setNewQuestion("");

    const questions = await handleGetQuestions();
    setQuestionItems(questions);
  }

  async function handleGetQuestions() {
    let questions = await (
      await database.ref(`rooms/${params.id}/questions`).get()
    ).exportVal();
    console.log(questions);
    return questions;
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
          <h1>Sala React Q&A</h1>
          <span>4 perguntas</span>
        </section>

        <form onSubmit={handleCreateQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
          />
          <div className="form-footer">
            <span>
              Para enviar uma pergunta,{" "}
              <button type="button">faça o login.</button>
            </span>
            <Button type="submit">Enviar pergunta</Button>
          </div>
        </form>
        <Question description="Teste" />
      </main>
    </div>
  );
}
