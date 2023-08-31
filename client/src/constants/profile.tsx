import { authConfug } from "@/configs/auth"
import { Names, ProfileList } from "@/types/types"
import { getServerSession } from "next-auth/next"

export const COLOR = '#a78bfa'
export const WIDTH = 35
export const CLASSNAME = ''

function generateListFromObject(obj: any): Array<{ title: string, value: any }> {
    const result: Array<{ title: string, value: any }> = [];
    const exclusion_fields = ['id', 'slug', 'image']
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value && !exclusion_fields.includes(key)) {
                const title = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
                result.push({ title, value });
            }
        }
    }

    return result;
}

export const userInformation = async () => {
    const session = await getServerSession(authConfug)
    const userInfo = {
        name: Names.profile,
        list: generateListFromObject(session!.user)
    }
    return userInfo as ProfileList
}
