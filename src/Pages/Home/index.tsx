import "./style.css";
import Comment from '../Comment';
import Form from '../../components/Form';
import MockData from '../../mocks/data.json';
import { useEffect, useState } from "react";
import { doAppendChildData, doAppendData, saveDataToLS } from "./helper";
import moment from "moment";

const Home = () => {
  const [apiData, setApiData] = useState<ICommentData[]>(MockData);
  const [isAscending, setIsAscending] = useState(false);

  useEffect(() => {
    const apiDataStringify = localStorage.getItem('apiData') || '';
    if (apiDataStringify) {
      const jsonData = JSON.parse(apiDataStringify);
      setApiData(jsonData);
    } else {
      const apiDataStringify = JSON.stringify(MockData);
      localStorage.setItem('apiData', apiDataStringify);
    }
  }, []);
  
  const onCommentFormSubmit = (formVal: IFormValue) => {
    const updatedData = doAppendData(apiData, formVal);
    setApiData(updatedData);
  };

  const doHandleSorting = () => {
    const sortedData = apiData.sort((firstData, secondData) => {
      if (isAscending) {
        return moment.utc(firstData.commentedDate).diff(moment.utc(secondData.commentedDate));
      }
      return moment.utc(secondData.commentedDate).diff(moment.utc(firstData.commentedDate));
    });
    setIsAscending((prevState) => !prevState);
    setApiData(sortedData);
  };

  const getRowAndCol = (id = '') => {
    const indexes = id.split('-');
    let row = +indexes[0], col = null;
    if (indexes.length === 2) {
      col = +indexes[1];
    }
    return { row, col };
  }

  const doEditHandler = (id: string = '') => {
    const {row, col} = getRowAndCol(id);
    const updatedData = apiData.slice();
    if (col !== null) {
      if (updatedData[row]?.replies?.length) {
        (updatedData[row].replies as Array<ICommentData>)[col].isEditable = true;
      }
    } else {
      updatedData[row].isEditable = true;
    }
    setApiData(updatedData);
  };

  const doDeleteHandler = (id: string = '') => {
    const {row, col} = getRowAndCol(id);
    let updatedData = apiData.slice();
    if (col !== null) {
      (updatedData[row].replies as Array<ICommentData>).splice(col, 1);
    } else {
      updatedData.splice(row, 1);
    }
    saveDataToLS(updatedData);
    setApiData(updatedData);
  };

  const doReplyHandler = (id: string = '') => {
    const {row, col} = getRowAndCol(id);
    let updatedData = apiData.slice();
    if (col !== null) return;
    updatedData[row].isRepliable = !updatedData[row].isRepliable;
    setApiData(updatedData);
  };

  const doSavetHandler = (id: string) => {
    const {row, col} = getRowAndCol(id);
    let updatedData = apiData.slice();
    if (col !== null) {
      if (updatedData[row]?.replies?.length) {
        (updatedData[row].replies as Array<ICommentData>)[col].isEditable = false;
      }
    } else {
      updatedData[row].isEditable = false;
    }
    setApiData(updatedData);
  }

  const doHandleCommentChanges = (text: string, id: string) => {
    const {row, col} = getRowAndCol(id);
    let updatedData = apiData.slice();
    if (col !== null) {
      (updatedData[row].replies as Array<ICommentData>)[col].comment = text;
    } else {
      updatedData[row].comment = text;
    }
    setApiData(updatedData);
  }

  const doHandleReplySubmission = (formVal: IFormValue, id: string) => {
    const {row, col} = getRowAndCol(id);
    if (col !== null) return;
    let updatedData = doAppendChildData(apiData, formVal, row);
    setApiData(updatedData);
  }

  return (
    <div className='home-wrapper'>
      <Form
        formTitle={"Comment"}
        inputPlaceholder={"Name"}
        textAreaPlaceholder={"Comment"}
        doSubmitHandler={onCommentFormSubmit}
      />
      <div className="sort-btn-wrapper">
        Sort By:
        <button onClick={doHandleSorting}>
          Date and Time 
          <i className="sort-icon">
            <img
              src={
                isAscending 
                  ? "src/assests/up-arrow-icon.svg"
                  : "src/assests/down-arrow-icon.svg"
                }
            />
          </i>
        </button>
      </div>
      <Comment
        data={apiData}
        indexId={''}
        doEditHandler={doEditHandler}
        doDeleteHandler={doDeleteHandler}
        doReplyHandler={doReplyHandler}
        doSavetHandler={doSavetHandler}
        doHandleCommentChanges={doHandleCommentChanges}
        doHandleReplySubmission={doHandleReplySubmission}
      />
    </div>
  )
}

export default Home;