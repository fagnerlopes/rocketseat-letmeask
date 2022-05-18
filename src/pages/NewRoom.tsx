import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

import logoImg from "../assets/images/logo.svg";
import illustrationImg from "../assets/images/illustration.svg";

import "../assets/css/newRoom.scss";

export function NewRoom() {
  const { user } = useAuth();
  const navigate = useNavigate();

  function handleHome(): void {
    if (!user) {
      navigate("/");
    }
  }

  useEffect(handleHome);

  return (
    <div id="page-new-room">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <h1>{user?.name}</h1>
          <img src={logoImg} alt="Logotipo da aplicação Letmeask" />

          <h2>Crie uma nova sala</h2>
          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
            <p>
              Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
