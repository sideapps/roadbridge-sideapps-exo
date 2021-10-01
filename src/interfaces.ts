
export interface QuestionModel {
    id: string
    type: string
    label: string|null
    choices: Array<ChoiceModel>
}

export interface QuestionProps {
    id: string
    type: string
    label: string|null
    choices: Array<ChoiceModel>
    onLabelChange: Function
    onTypeChange: Function
    onRemoveQuestion: Function
    onChoiceChange: Function
    onRemoveChoice: Function
    onAddChoice: Function
}

export interface ChoiceModel {
    id: string,
    label: string|null
}

export interface ChoiceProps {
    id: string,
    label: string|null
    onChoiceChange: Function
    onRemoveChoice: Function
}