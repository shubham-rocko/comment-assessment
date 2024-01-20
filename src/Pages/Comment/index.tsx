import { Fragment, useState } from "react";
import "./style.css";
import CommentCard from "../../components/CommentsCard";
import Form from "../../components/Form";

interface CommentPropsInterface {
  data: ICommentData[];
  indexId: string;
  doEditHandler: FN;
  doDeleteHandler: FN;
  doReplyHandler: FN;
  doSavetHandler: FN;
  doHandleCommentChanges: (text: string, id: string) => void;
  doHandleReplySubmission: (formVal: IFormValue, id: string) => void;
}

type FN = (id: string) => void;

const Comment = (props: CommentPropsInterface) => {
  const {
    data,
    indexId,
    doEditHandler,
    doDeleteHandler,
    doReplyHandler,
    doSavetHandler,
    doHandleCommentChanges,
    doHandleReplySubmission,
  } = props;

  const onCommentChangeHandler = (replyText: string, parentId: string, childIndex: number) => {
    const id = parentId ? `${parentId}-${childIndex}` : `${childIndex}`
    doHandleCommentChanges(replyText, id);
  };
  const onCommentFormSubmit = (formVal: IFormValue, parentId: string, childIndex: number) => {
    const id = parentId ? `${parentId}-${childIndex}` : `${childIndex}`
    doHandleReplySubmission(formVal, id);
  }
  
  return (
    data.map((commentData: ICommentData, childIndex: number) => {
      const {
        id,
        name,
        comment,
        commentedDate,
        replies = [],
        isRepliable = false,
        isEditable = false,
        isComment = false,
      } = commentData;
      return (
        <Fragment key={id}>
          <CommentCard
            name={name}
            comment={comment}
            commentedDate={commentedDate}
            isComment={isComment}
            isEditable={isEditable}
            doReplyHandler={() => doReplyHandler(indexId ? `${indexId}-${childIndex}` : `${childIndex}`)}
            doEditHandler={() => doEditHandler(indexId ? `${indexId}-${childIndex}` : `${childIndex}`)}
            doDeleteHandler={() => doDeleteHandler(indexId ? `${indexId}-${childIndex}` : `${childIndex}`)}
            doSavetHandler={() => doSavetHandler(indexId ? `${indexId}-${childIndex}` : `${childIndex}`)}
            onCommentChangeHandler={(text) => onCommentChangeHandler(text, indexId, childIndex)}
          />
          {isRepliable && 
            <div className="reply-wrapper">
              <Form
                formTitle={"Comment"}
                inputPlaceholder={"Name"}
                textAreaPlaceholder={"Comment"}
                doSubmitHandler={(formVal: IFormValue) => onCommentFormSubmit(formVal, indexId, childIndex)}
              />
            </div>
          }
          {replies.length > 0 && 
            <div className="reply-wrapper">
              <Comment
                {...props}
                data={replies}
                indexId={`${childIndex}`}
              />
            </div>
          }
        </Fragment>
      );
    })
  )
};

export default Comment;