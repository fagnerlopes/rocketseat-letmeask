import avatarImg from "../assets/images/avatar.svg";
import likeImg from "../assets/images/like.svg";

import "../assets/css/question.scss";

export function Question(props: any) {
  return (
    <div className="question-card">
      <div className="question-body">{props.description}</div>
      <div className="question-footer">
        <div className="question-user">
          <img src={avatarImg} alt="Avatar do usuário" />
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
