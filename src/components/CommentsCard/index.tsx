import { SyntheticEvent } from "react";
import "./style.css";
import moment from "moment";

interface CommentCardInterface {
  name: string;
  comment: string;
  commentedDate: number;
  isRepliable?: boolean;
  isComment?: boolean;
  isEditable?: boolean;
  doReplyHandler?: () => void;
  doEditHandler: () => void;
  doDeleteHandler: () => void;
  doSavetHandler: () => void;
  onCommentChangeHandler: (str: string) => void;
}

const CommentCard = (props: CommentCardInterface) => {
  const {
    name,
    comment,
    commentedDate,
    isEditable = false,
    isComment = false,
    doReplyHandler,
    doEditHandler,
    doDeleteHandler,
    doSavetHandler,
    onCommentChangeHandler,
  } = props;
  const updatedDate = moment(commentedDate).format('Do MMM YYYY');
  const doCommentHandle = (event: SyntheticEvent) => {
    onCommentChangeHandler(event.target.value);
  }
  return (
    <div className="comment-wrapper">
      <div className="name-wrapper">
        <h4>{name}</h4>
        <span>{updatedDate}</span>
      </div>
      {
        isEditable 
          ? <textarea
              value={comment}
              placeholder={"Enter your comment here..."}
              onChange={doCommentHandle}
            />
          : <div className="textarea-wrapper">{comment}</div>
      }
      <div className="btns-wrapper">
        {isComment && <button onClick={doReplyHandler}>Reply</button>}
        {isEditable
          ? <button onClick={doSavetHandler}>Save</button>
          : <button onClick={doEditHandler}>Edit</button>
        }
      </div>
      <div>
        <button className="delete-btn" onClick={doDeleteHandler}>
          <i className="delete-icon">
            <img src="src/assests/delete-icon.svg"/>
          </i>
        </button>
      </div>
    </div>
  )
}

export default CommentCard;