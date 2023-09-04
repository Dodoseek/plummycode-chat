import { RestrictiveUser } from "./users";

export interface UsersFriends {
    user: RestrictiveUser,
    friends: RestrictiveUser[]
}

export enum TabFriendRequestNames {
    received = "Applications Received",
    submitted = "Submitted applications",
}

export interface FriendRequest {
    id: number,
    receiver: RestrictiveUser,
    sender: RestrictiveUser,
    is_active: boolean,
    timestamp: Date
}

export interface FriendResponse extends ListData {
    results: FriendRequest[]
}

export interface RequestList {
    name: TabFriendRequestNames,
    list: FriendRequest[]
}