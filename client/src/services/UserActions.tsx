export async function getUsers() {
    const API_URL = process.env.API_URL!
    const res = await fetch(API_URL + 'users/', {
        next: {
            revalidate: 600
        }
    });

    return res.json()
}