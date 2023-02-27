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

export interface signupIcon {
    icon?: string | null
}

export interface transactionDetails{
    id: number,
    food_details: number,
    quantity: number

}