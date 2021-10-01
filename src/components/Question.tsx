import {QuestionProps} from "../interfaces";
import {Button, Input, Select} from "antd"
import {ChangeEvent} from "react";
import {Choice} from "./Choice";

const { Option } = Select;

export const Question = (props: QuestionProps) => {

    const handleLabelChange = (e:ChangeEvent<HTMLInputElement>) => {
        props.onLabelChange(props.id, e.target.value)
    }

    const handleTypeChange = (value:string) => {
        props.onTypeChange(props.id, value)
    }

    const onChoiceChange = (choiceID:number, value:string) => {
        props.onChoiceChange(props.id, choiceID, value)
    }

    const onRemoveChoice = (choiceID:number) => {
        props.onRemoveChoice(props.id, choiceID)
    }

    const handleClickOnDeleteQuestionButton = () => {
        props.onRemoveQuestion(props.id)
    }

    const handleClickOnAddChoice = () => {
        props.onAddChoice(props.id)
    }

    return (
       <div className="question">
           <div className="field">
               <Select className="inputFieldSelectType" defaultValue={props.type} onChange={handleTypeChange}>
                   <Option value="text">Texte</Option>
                   <Option value="email">Email</Option>
                   <Option value="number">Nombre</Option>
                   <Option value="choice">Choix multiples</Option>
               </Select>
               <Input type="text" value={props.label ?? ''} onChange={handleLabelChange} />
               <Button onClick={handleClickOnDeleteQuestionButton} danger>Suppr</Button>
           </div>
           <div className="choices">
               {
                   props.choices.map(choice => (
                       <Choice
                           key={`choice${props.id}-${choice.id}`}
                           id={choice.id}
                           label={choice.label}
                           onChoiceChange={onChoiceChange}
                           onRemoveChoice={onRemoveChoice}
                       />
                   ))
               }
           </div>
           {
               props.type === 'choice' && (
                   <Button className="buttonAddChoice" type="primary" onClick={handleClickOnAddChoice}>Ajouter une option</Button>
               )
           }
       </div>
    )

}