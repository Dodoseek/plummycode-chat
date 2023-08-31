export async function getFriendListById(id: number) {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + `friendlist/friends/${id}`, {
        next: {
            revalidate: 60
        }
    });

    return response.json()
};