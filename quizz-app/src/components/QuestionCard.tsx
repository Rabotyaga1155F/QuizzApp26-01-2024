import React, {FC, useState} from "react";
import { QuestionProps } from "../types/types.ts";

const QuestionCard: FC<QuestionProps> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);


  return (
    <div className={'cardwrapper'}>
      <p className={'questionName'}>
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map(answer => (
          <div key={answer}>
            <button  className={'cardbutton'}
                     disabled={!!userAnswer} value={answer} onClick={callback}>
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
