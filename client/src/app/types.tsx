interface User {
    id: number,
    username: string,
    first_name: string | null,
    last_name: string | null,
    email: string,
    pictures: string[],
    slug: string
};

interface CreateUser extends Required<Omit<User, 'id' | 'slug' | 'pictures'>> {
    password: string
}

interface AllUsers {
    count: number,
    next: string,
    previous: string,
    results: User[]
};

type ActivationData = {
    uid: string,
    token: string,
}

type AccesData = {
    email: string,
    password: string
};

type DataToken = {
    expiry : Date,
    token: string,
    user: User
}

interface PropsUtilityData {
    width?: string,
    color?: string
}
