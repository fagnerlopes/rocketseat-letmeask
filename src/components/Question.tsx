import "../assets/css/question.scss";
import { ReactNode } from "react";

// passando dois objetos como props inclusive o conteúdo dinámico do card
type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
} & {
  children: ReactNode;
};

export function Question(props: QuestionProps) {
  const { content, author } = props;
  return (
    <div className="question-card">
      <div className="question-body">{content}</div>
      <footer className="question-footer">
        <div className="question-user">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        {props.children}
      </footer>
    </div>
  );
}
