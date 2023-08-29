export async function getUsers() {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + 'users/', {
        next: {
            revalidate: 60
        }
    });

    return response.json()
};

interface UserCredentials {
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
};

export async function createUser(credentials: UserCredentials) {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + 'users/account/register/', {
        method: "POST",
        body: JSON.stringify(credentials)
    });
    return response.json()
}