import avatarImg from "../assets/images/avatar.svg";
import likeImg from "../assets/images/like.svg";

import "../assets/css/question.scss";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
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
        <div className="question-likes">
          <span>16</span>
          <button>
            <img src={likeImg} alt="Like" />
          </button>
        </div>
      </footer>
    </div>
  );
}
