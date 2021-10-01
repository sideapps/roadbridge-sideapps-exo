import { useState } from 'react'
import 'antd/dist/antd.css';
import './app.css';
import {Question} from "./components/Question";
import {ChoiceModel, QuestionModel} from "./interfaces";
import {Button} from "antd";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [questions, setQuestions] = useState<Array<QuestionModel>>([{
        type: 'text',
        label: null,
        id: uuidv4(),
        choices: []
    }])


    const onLabelChange = (id:string, newLabel:string) => {
        const index = questions.findIndex(q => q.id === id)
        if (index !== -1) {
            const updatedQuestion = questions[index]
            updatedQuestion.label = newLabel
            updateQuestion(index, updatedQuestion)
        }
    }

    const onTypeChange = (id:string, newType:string) => {
        const index = questions.findIndex(q => q.id === id)
        if (index !== -1) {
            const updatedQuestion = questions[index]
            updatedQuestion.type = newType
            if(updatedQuestion.type === 'choice') {
                const choice:ChoiceModel = {
                    id: uuidv4(),
                    label: null
                }
                updatedQuestion.choices = [choice]
            }
            updateQuestion(index, updatedQuestion)
        }
    }

    const onRemoveQuestion = (id:string) => {
        setQuestions(questions => questions.filter(q => q.id !== id))
    }

    const onAddChoice = (questionID:string, label:string) => {
        const index = questions.findIndex(q => q.id === questionID)
        if (index !== -1) {
            const updatedQuestion = questions[index]
            const newChoice:ChoiceModel = {
                id: uuidv4(),
                label: null
            }
            updatedQuestion.choices = [...updatedQuestion.choices, newChoice]
            updateQuestion(index, updatedQuestion)
        }
    }

    const onRemoveChoice = (questionID:string, choiceID:string) => {
        const index = questions.findIndex(q => q.id === questionID)
        if (index !== -1) {
            const updatedQuestion = questions[index]
            updatedQuestion.choices = updatedQuestion.choices.filter(c => c.id !== choiceID)
            updateQuestion(index, updatedQuestion)
        }
    }

    const onChoiceChange = (questionID:string, choiceID:string, label:string) => {
        const index = questions.findIndex(q => q.id === questionID)
        if (index !== -1) {
            const updatedQuestion = questions[index]
            const updatedChoiceIndex = updatedQuestion.choices.findIndex(c => c.id === choiceID)
            if (updatedChoiceIndex !== -1) {
                const updatedChoice = updatedQuestion.choices[updatedChoiceIndex]
                updatedChoice.label = label
                updateQuestion(index, updatedQuestion)
            }
        }
    }

    const updateQuestion = (index:number, updatedQuestion:QuestionModel) => {
        setQuestions(() => [
            ...questions.slice(0, index),
            updatedQuestion,
            ...questions.slice(index+1)
        ])
    }

    const handleClickOnAddButton = () => {
        const newQuestion:QuestionModel = {
            id: uuidv4(),
            type: 'text',
            label: null,
            choices: []
        }
        setQuestions(questions => [...questions, newQuestion])
    }

    return (
        <div className="app">
          <div className="questions">
            {
              questions.map(question => {
                return (
                    <Question
                        key={`question-${question.id}`}
                        id={question.id}
                        type={question.type}
                        label={question.label}
                        choices={question.choices}
                        onLabelChange={onLabelChange}
                        onTypeChange={onTypeChange}
                        onRemoveQuestion={onRemoveQuestion}
                        onAddChoice={onAddChoice}
                        onRemoveChoice={onRemoveChoice}
                        onChoiceChange={onChoiceChange}
                    />
                )
              })
            }
          </div>
          <div className="actions">
            <Button className="addQuestionButton" type="primary" onClick={handleClickOnAddButton}>Ajouter une question</Button>
          </div>
        </div>
    )
}

export default App
