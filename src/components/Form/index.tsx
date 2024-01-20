import { SyntheticEvent, useState } from "react";
import "./style.css";

interface FormPropsInterface {
    formTitle: string;
    inputPlaceholder: string;
    textAreaPlaceholder: string;
    doSubmitHandler: (formVal: IFormValue) => void;
}


const Form = (props: FormPropsInterface) => {
  const [inputValue, setInputValue] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const {
    inputPlaceholder,
    textAreaPlaceholder,
    formTitle,
    doSubmitHandler,
  } = props;

  const inputChangeHandler = (event: SyntheticEvent) => {
    setInputValue(event.target.value);
  };

  const textAreaChangeHandler = (event: SyntheticEvent) => {
    setTextAreaValue(event.target.value);
  };

  const formSubmitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    const formVal = {
      name: inputValue,
      comment: textAreaValue
    };
    doSubmitHandler(formVal);
    setInputValue('');
    setTextAreaValue('');
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={formSubmitHandler}>
        <div className="title-wrapper">{formTitle}</div>
        <div>
          <input
            type="text"
            className="name-input"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={inputChangeHandler}
          />
        </div>
        <div>
          <textarea
            rows="4"
            className="comment-area"
            value={textAreaValue}
            placeholder={textAreaPlaceholder}
            onChange={textAreaChangeHandler}
          />
        </div>
        <div className="button-wrapper">
          <button
            type="submit"
            className={"post-btn"}
            disabled={!inputValue || !textAreaValue}
          >
              Post
          </button>
        </div>
      </form>   
    </div>
  )
};

export default Form;