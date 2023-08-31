import { useRouter } from "next/navigation"
import "@/app/globals.css";

export default function Custom404() {

    const router = useRouter()

    return (
        <>
            <div className="h-screen cross-pattern flex justify-center">
                <main className="w-screen sm:max-w-screen-sm flex items-center justify-center flex-col">
                    <h1 className=" w-auto">404 - Page Not Found</h1>
                    <button className="plummy-button w-56" onClick={() => router.back()}>
                        Go Back
                    </button>
                </main>
            </div>

        </>
    )
}