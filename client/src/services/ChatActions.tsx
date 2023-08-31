export async function getMyChats(access_token: string) {
    const API_URL = process.env.API_URL!
    const response = await fetch(API_URL + `chat/action/`, {
        next: {
            revalidate: 0
        },
        headers: { 
            Authorization : `Bearer ${access_token}`
         }
    });

    return response.json()
};