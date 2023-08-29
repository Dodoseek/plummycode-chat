interface User {
    id: number,
    username: string,
    first_name: string | null,
    last_name: string | null,
    email: string,
    image: string,
    slug: string
};

interface CreateUser extends Omit<User, "id" | "image" | "slug"> {
    password1: string,
    password2: string,
};

interface AllUsers {
    count: number,
    next: string,
    previous: string,
    results: User[]
};

interface PropsUtilityData {
    width?: string,
    color?: string
}

type Links = {
    links: Link[]
}

type Link = {
    href: string,
    icon: React.ReactNode
}

type ResponseUser = {
    access: string,
    refresh: string,
    user: User
}

type SignInProvider = 'credentials' | 'google';

interface GoogleResponse {
    name?: string,
    email?: string,
    picture?: string,
    sub?: string,
    user: User,
    access_token: string,
    refresh_token: string,
    provider?: SignInProvider,
    expires?: number,
    iat?: number,
    exp?: number,
    jti?: string
}

interface GoogleSignInData {
    provider: 'google',
    type: 'oauth',
    providerAccountId: '117683573303464064792',
    access_token: 'ya29.a0AfB_byCVOtyEIxvvHlh42lTib4BVMtxcv2BGxQSUG6g3eqWgCJs2BuXAIDLCJNYR1TwZHamhz_eE0ESnPbx6bPnDlqRE-mh2gZ6CzJhKhu710hlxpdvaTqkB2OMjjuM-LbULPjDk3ufTc6FVcK-xml5Cr-IbwUlndF3zVAaCgYKATkSARISFQHsvYlshX-vLe_-xGOBv2rvg1Ey5A0173',
    expires_at: number,
    refresh_token: '1//0cjD2td2EpESdCgYIARAAGAwSNwF-L9IrnzQCBjtjci2mnCWcY7pKXXnGhC_cuLan3RMy3Rsyap_efxrWb8Zl2YsJ0qDXl2i6OLs',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid',
    token_type: 'Bearer',
    id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTExNDEwNTlhMTliMjE4MjA5YmM1YWY3YTgxYTcyMGUzOWI1MDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2MTY3NjY0NzA2MjktNjFwZmRvaHBsa28wc3M5MW5xb2cwZnU4azR1azYyZzQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2MTY3NjY0NzA2MjktNjFwZmRvaHBsa28wc3M5MW5xb2cwZnU4azR1azYyZzQuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc2ODM1NzMzMDM0NjQwNjQ3OTIiLCJlbWFpbCI6ImFuZHJld3NpdGV3b3Jrc3BhY2VAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJSUkFWX0tmTkZPOUdmOXJ1ZUxpRzNnIiwibmFtZSI6ItCQ0L3QtNGA0LXQuSDQk9C70YPRiNC90LXQsiIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQWNIVHRmSGRlZVZHdkJ0OEpzUEhGelk1cFpRZ2ZyNjJnNWR2bEp2Wk55TUNQaHk9czk2LWMiLCJnaXZlbl9uYW1lIjoi0JDQvdC00YDQtdC5IiwiZmFtaWx5X25hbWUiOiLQk9C70YPRiNC90LXQsiIsImxvY2FsZSI6InJ1IiwiaWF0IjoxNjkzMjAxMTMwLCJleHAiOjE2OTMyMDQ3MzB9.W-r41ap-WRYl7OH4DcCkA35SkoKLT4DP6_-9aZIkqCibmNCriN4FYQqPY_3SD6-nqGk31iZNzsQ32h2tQi76TgQO5GISo4NhT_Nwmfjxbx4Et1894sNdao3kZ7CJUxaN32hm1xcZmhrN4dl2bwzc5mYpnGf6rnxPdvgfc2smc-9f50pcUwhxTdFZumB2zXAfxCpiAy6oglRtIx0uvWCt-ZbvNlXXhLrLUB1IsjG3_aMekwgFzvqNDuOeByLU3KOkoa2XZEONKyXElZpP8z2XM4NhzgSy_n7wWlDvEY79-Bp9S6UQ_RlVexJ9Yk7cq7Fg01bbDfFDdnHEgT9iMzo3Rg',
    meta: ResponseUser
}