import { User } from "./types"

enum TypeOfMessage {
    Message,
    Action,
}

export interface Message {
    user: number,
    text: string,
    date: Date
    type_of: TypeOfMessage
}

export interface Chat {
    id: number,
    image: string,
    name: string,
    last_message: Message,
    users: User[]
}

export interface MyChatsList {
    count: number,
    next: string | null,
    previous: string | null,
    results: Chat[]
}