import avatarImg from "../assets/images/avatar.svg";
import likeImg from "../assets/images/like.svg";

import "../assets/css/question.scss";

type Question = {
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  isHighlighted: boolean;
  isAnswered: boolean;
};

type QuestionItemsProp = {
  items: Array<Question>;
};

export function Question(props: QuestionItemsProp) {
  const items = props.items;

  return (
    <div className="question-card">
      <div className="question-body">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis alias
        quibusdam soluta! Animi iste maiores aliquam aut autem, recusandae,
        necessitatibus suscipit hic tempora aliquid doloribus id? Debitis
        voluptas autem ad?
      </div>
      <div className="question-footer">
        <div className="question-user">
          <img src={avatarImg} alt="Avatar do usuario" />
          <span>Rachel Zane</span>
        </div>
        <div className="question-like">
          <span>16</span>
          <button>
            <img src={likeImg} alt="Like" />
          </button>
        </div>
      </div>
    </div>
  );
}
