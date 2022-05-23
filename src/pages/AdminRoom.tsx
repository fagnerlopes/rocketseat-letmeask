import { useNavigate, useParams } from "react-router-dom";
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import answerImg from "../assets/images/answer.svg";
import checkImg from "../assets/images/check.svg";
import { Button } from "../components/Button";

import "../assets/css/room.scss";
import "../assets/css/admin-room.scss";

import { Question } from "../components/Question";
import { database } from "../services/firebase";
import { RoomCode } from "../components/RoomCode";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const params = useParams<RoomParams>();
  const navigate = useNavigate();
  const { questionItems, title } = useRoom(params.id || "");

  async function handleCloseRoom() {
    await database.ref(`rooms/${params.id}`).update({
      closedAt: new Date(),
    });

    navigate("/");
  }

  function handleAnswerQuestion() {
    //
  }

  function handleCheckQuestion() {
    //
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${params.id}/questions/${questionId}`).remove();
    }
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
          {questionItems.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <div className="question-actions">
                  <button type="button" onClick={handleAnswerQuestion}>
                    <img src={answerImg} alt="Like" />
                  </button>
                  <button type="button" onClick={handleCheckQuestion}>
                    <img src={checkImg} alt="Like" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteQuestion(question.id)}
                  >
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
