interface IFormValue {
  name: string;
  comment: string;
}

interface ICommentData extends IFormValue {
  commentedDate: number;
  id: string;
  isEditable: boolean;
  isRepliable: boolean;
  isComment?: boolean;
  replies?: ICommentData[]
}