import { Navigate, useNavigate, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
import { Button } from "../components/Button";

import "../assets/css/room.scss";
import "../assets/css/admin-room.scss";

import { Question } from "../components/Question";
import { FormEvent, useEffect, useState } from "react";
import { database } from "../services/firebase";
import { useAuth } from "../hooks/useAuth";
import { RoomCode } from "../components/RoomCode";
import { toast } from "react-toastify";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const { user } = useAuth();
  const { questionItems, title, authorId } = useRoom(params.id || "");

  function handleCloseRoom() {
    //
  }

  function handleAnswerQuestion() {
    //
  }

  function handleCheckQuestion() {
    //
  }

  function handleDeleteQuestion() {
    //
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <div className="admin-buttons">
              <RoomCode code={params.id || "No code"} />
              <Button isOutlined onClick={handleCloseRoom}>
                Encerrar sala
              </Button>
            </div>
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

        {/* Única maneira de percorrer um array em JSX */}
        <div className="question-list">
          {questionItems.map((item) => {
            return (
              <Question
                key={item.id}
                content={item.content}
                author={item.author}
              >
                <div className="question-actions">
                  <button onClick={handleAnswerQuestion}>
                    <img src={answerImg} alt="Like" />
                  </button>
                  <button onClick={handleCheckQuestion}>
                    <img src={checkImg} alt="Like" />
                  </button>
                  <button onClick={handleDeleteQuestion}>
                    <img src={deleteImg} alt="Like" />
                  </button>
                </div>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
