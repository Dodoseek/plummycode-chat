export async function getFriendListById(id: number) {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + `friendlist/friends/${id}`, {
        next: {
            revalidate: 60
        }
    });

    return response.json()
};

export async function getMyRecievedRequests(access_token: string) {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + `friendlist/receiver`, {
        next: {
            revalidate: 0
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    return response.json()
};

export async function getMySendedRequests(access_token: string) {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + `friendlist/request`, {
        next: {
            revalidate: 0
        },
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    });

    return response.json()
};