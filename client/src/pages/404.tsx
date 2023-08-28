import { useRouter } from "next/navigation"


export default function Custom404() {

    const router = useRouter()

    return (
        <>
            <h1>404 - Page Not Found</h1>
            <button onClick={() => router.back()}>
                Go Back
            </button>
        </>
    )
}