export const saveDataToLS = (data: ICommentData[]) => {
  const apiDataStringify = JSON.stringify(data);
  localStorage.setItem('apiData', apiDataStringify);
}

export const doAppendData = (initialData: ICommentData[], rawData: IFormValue) => {
  const transformedData = {
    ...rawData,
    commentedDate: +new Date(),
    id: `${initialData.length}`,
    isEditable: false,
    isRepliable: false,
    isComment: true,
  };
  const updatedData = [...initialData, transformedData];
  saveDataToLS(updatedData);
  return updatedData;
};

export const doAppendChildData = (initialData: ICommentData[], rawData: IFormValue, index: number) => {
  const transformedData = {
    ...rawData,
    commentedDate: +new Date(),
    id: `${index}-${(initialData[index]?.replies as Array<ICommentData>)?.length || 0}`,
    isEditable: false,
    isRepliable: false,
    isComment: false,
  };
  let updatedData = initialData.slice();
  if (!updatedData[index]?.replies) updatedData[index] = {...updatedData[index], replies: []};
  updatedData[index]?.replies?.push(transformedData);
  saveDataToLS(updatedData);
  return updatedData;
}