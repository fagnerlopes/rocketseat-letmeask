import { ReactNode } from "react";
import cx from "classnames";
import "../assets/css/question.scss";

// passando dois objetos como props inclusive o conteúdo dinámico do card
type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
} & {
  children: ReactNode;
  isAnswered?: boolean;
  isHighlight?: boolean;
};

export function Question({
  content,
  author,
  isHighlight,
  isAnswered,
  children,
}: QuestionProps) {
  return (
    <div
      className={cx(
        "question-card",
        { answered: isAnswered },
        { highlighted: isHighlight && !isAnswered }
      )}
    >
      <div className="question-body">{content}</div>
      <footer className="question-footer">
        <div className="question-user">
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </div>
        {children}
      </footer>
    </div>
  );
}
