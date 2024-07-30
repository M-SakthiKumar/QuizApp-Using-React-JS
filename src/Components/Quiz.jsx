import React, { useEffect, useState } from "react";
import "./QuizStyles.css";
import Questionsset from "./Questions.json"

function QuizApp(){
    const[CurrentQuestion,setCurrentQuetions]=useState(0)
    const[Score,setScore]=useState(0)
    const[Showscore,setShowscore]=useState(false)
    const[Timer,setTimer]=useState(15);
    useEffect(()=>{
        let interval;
        if(Timer >0 && !Showscore){
            interval=setInterval(() => {
                setTimer((prevTimer)=>prevTimer-1)
            }, 1000);
          

        }
        else{
            clearInterval(interval)
            setShowscore(true)
        }
return ()=> clearInterval(interval) // Cleanup function to clear interval on unmount or dependency change

      
    },[Timer,Showscore])
function handleAnswerCheck(selctedoptions){
    if(selctedoptions===Questionsset[CurrentQuestion].correctOption){
        setScore((prevscore)=>prevscore+1)
    }
if(CurrentQuestion < Questionsset.length-1){
    setCurrentQuetions((Prevquestions) => Prevquestions + 1)
    setTimer(15)
}
else{
    setShowscore(true)
}
}
function handleReStart(){
    setCurrentQuetions(0)
    setScore(0)
    setShowscore(false)
    setTimer(15)
}

    return(
        <>
        <div className="quiz-app">
           {Showscore ?  <div className="score-section"  >
                <h2>Your Score: {Score} out of {Questionsset.length}</h2>
                <h4>Your Accuracy is: {(Score / Questionsset.length * 100).toFixed(2)}%</h4>

                <button onClick={()=>handleReStart()}>Restart</button>

            </div>:  ( <div className="question-section">
                <h1>React js Quiz</h1>
                <h2>Question {CurrentQuestion+1}</h2>
                <p>{Questionsset[CurrentQuestion].Questions}</p>
                <div className="options">
                {Questionsset[CurrentQuestion].options.map((option,index)=>(
                            <button key={index} onClick={()=>handleAnswerCheck(option)}>{option}</button>
                ))}
                </div>
                <div className="timer">
                    Time Left: <span>{Timer}s</span>
                </div>
            </div>)}
          

        </div>
        </>
    )
}
export default QuizApp