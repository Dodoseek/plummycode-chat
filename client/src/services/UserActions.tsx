export async function getUsers() {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + 'users/get', {
        next: {
            revalidate: 60
        }
    });

    return response.json()
};

export async function getUserBySlug(slug: string) {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + `users/get/${slug}`, {
        next: {
            revalidate: 60
        }
    });

    return response.json()
};