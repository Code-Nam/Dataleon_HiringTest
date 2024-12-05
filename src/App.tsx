import { useEffect, useState } from "react";
import "./App.css";
import data from "./questionsAndAnswers.json";

//* The data has been structured as if it was coming from an API
//* The data is an array of objects, each object has a question and an array of answers

// For a simpler version, the data can be stored in a single array of strings: ["Question 1", "Answer 1", "Answer2"]
// Create a useState<string> to store chosen answer. e.g. const [answerText, setAnswerText] = useState<string>();
// put the question(data[0]) in a <h2> tag
// create two buttons for Yes and No with onClick event to set the chosen answer in the state
// <button onClick={() => setAnswerText(data[1])}>Yes</button>
// display the chosen answer in a <p> tag

function App() {
    const [answerText, setAnswerText] = useState<string>();
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [displayChoice, setDisplayChoice] = useState<boolean>(true);
    const [seconds, setSeconds] = useState<number>(5);

    const handleAnswer = (selectedAnswer: number) => {
        // selected answer is either Yes(1) or No(0)
        setAnswerText(data[currentQuestion]?.answers[selectedAnswer] || "");
        setDisplayChoice(false);
        setSeconds(5);
    };

    useEffect(() => {
        if (displayChoice) return;

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds > 1) return prevSeconds - 1;

                clearInterval(interval);

                // Handle next question or end of quiz
                if (currentQuestion >= data.length - 1) {
                    setAnswerText("You have answered all the questions!");
                    setDisplayChoice(false);
                } else {
                    setCurrentQuestion((prev) => prev + 1);
                    setAnswerText("");
                    setDisplayChoice(true);
                }

                return 0;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [displayChoice, currentQuestion]);

    return (
        <main>
            <h1>Questions / Answers Game</h1>
            <section>
                {/* Display message if data empty or undefined */}
                {data.length > 0 ? (
                  displayChoice && (
                    <>
                      <h2>{data[currentQuestion]?.question}</h2>
                      <ul>
                        <button onClick={() => handleAnswer(1)}>Yes</button>
                        <button onClick={() => handleAnswer(0)}>No</button>
                      </ul>
                    </>
                  )
                ) : (
                  <p>No questions available.</p>
                )}
                
                {answerText && <p>{answerText}</p>}

                {!displayChoice && seconds > 0 && (
                    <p>Next question in {seconds}</p>
                )}
            </section>
        </main>
    );
}

export default App;
