import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../assets/css/newRoom.scss";
import { Button } from "../components/Button";

export function NewRoom() {
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
          <img src={logoImg} alt="Logotipo da aplicação Letmeask" />

          <h2>Crie uma nova sala</h2>
          <form>
            <input type="text" placeholder="Nome da sala" />
            <Button type="submit">Criar sala</Button>
            <p>
              Quer entrar em uma sala existente? <a>Clique aqui</a>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
