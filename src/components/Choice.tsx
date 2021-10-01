import {ChoiceProps} from "../interfaces";
import {Button, Input as AntDesignInput} from "antd";
import {ChangeEvent} from "react";

export const Choice = (props:ChoiceProps) => {

    const handleChoiceChange = (e:ChangeEvent<HTMLInputElement>) => {
        props.onChoiceChange(props.id, e.target.value)
    }

    const handleClickOnDeleteChoiceButton = () => {
        props.onRemoveChoice(props.id)
    }

    return (
        <div className="choice">
            <AntDesignInput type="text" value={props.label ?? ''} onChange={handleChoiceChange} />
            <Button onClick={handleClickOnDeleteChoiceButton} danger>Suppr</Button>
        </div>
    )

}