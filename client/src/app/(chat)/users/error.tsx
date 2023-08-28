'use client';

export default function ErrorUsers({ }) {

    return (
        <>
            <div className="flex flex-col justify-around items-center py-10 h-48 w-full">
                <h2 className=' text-violet-900 font-bold text-xl'>Something went wrong!</h2>
                {/* <button className=' hover:text-white hover:bg-violet-950 font-semibold px-5 py-2 rounded-full border-2 hover:border-white transition-all border-violet-700'
                    onClick={() => { revalidatePath(API_URL + 'users/') }}>
                    Try again
                </button> */}
            </div>
        </>
    )
}