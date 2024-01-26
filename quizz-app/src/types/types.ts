export interface QuestionProps {
  question: string;
  answers: string[];
  callback: (e:React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
}

export type AnswerObject ={
  question:string,
  answer:string,
  correct:boolean,
  correctAnswer:string
}