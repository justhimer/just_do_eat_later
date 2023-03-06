export interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    password?: string,
    icon?: string,
}

export interface UserSignup {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    confirm: string,
    date_of_birth: string,
    gender: string,
    height: number,
    weight: number
}

export interface SignupIcon {
    icon?: string | null
}

export interface TransactionDetails {
    id: number,
    food_details: number,
    quantity: number

}

export interface ExerciseDetails {
    id: number,
    repetitions: number,
    caloriseburn: number,
}