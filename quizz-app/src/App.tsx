import "./App.css";
import React, {FC, useState} from "react";
import {fetchQuizQuestions} from './API.ts'
//Types
import {Difficulty, QuestionState} from "./types/API-types.ts";
import {AnswerObject} from "./types/types.ts";
import QuestionCard from "./components/QuestionCard.tsx";

const TOTAL_QUESTIONS = 10;


const App: FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
      setLoading(true);
      setGameOver(false);

      const newQuestions = await fetchQuizQuestions(
          TOTAL_QUESTIONS,Difficulty.EASY
      )

      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([]);
      setNumber(0)
      setLoading(false)
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!gameOver){

          const answer = e.currentTarget.value;

          const correct = questions[number].correct_answer == answer;

          if (correct) setScore(prev=> prev + 1)

          const answerObject ={
              questions:questions[number].question,
              answer,
              correct,
              correctAnswer:questions[number].correct_answer,
          }
          // @ts-ignore
          setUserAnswers((prev) => [...prev,answerObject]);
      }

  };

  const nextQuestion = () => {
      const nextQuestion = number +1;
      if (nextQuestion === TOTAL_QUESTIONS){
          setGameOver(true);

      }else {
          setNumber(nextQuestion)
      }
  };


  return (
    <div className={'wrapper'}>
      <h1>React Quiz</h1>
        {gameOver || userAnswers.length===TOTAL_QUESTIONS ? (
            <button className={'glow-on-hover'} onClick={startTrivia}>Start</button>
        ) :null}
        {!gameOver ? <p className={'score'}>Score: {score}</p> : null}

        {loading ? <p>Loading Question...</p> : null}
        {!loading && !gameOver && (
        <QuestionCard
            question={questions[number].question}
            answers={questions[number].answers}
            callback={checkAnswer}
            questionNumber={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
        /> )}
        {!gameOver && !loading && userAnswers.length === number +1 && number !==TOTAL_QUESTIONS -1 ?(

            <button className={'glow-on-hover'} onClick={nextQuestion}>Next Question</button>
        ) : null}


    </div>
  );
};

export default App;
