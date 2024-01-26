export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = 'hard',

}

export interface Question{
    category:string
    correct_answer:string
    difficulty:string
    incorrect_answers:string[]
    question:string
    type:string
}

export type QuestionState = Question & {answers:string[]};