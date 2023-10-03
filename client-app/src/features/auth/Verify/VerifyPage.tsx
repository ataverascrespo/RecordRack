import { observer } from "mobx-react-lite";

function VerifyPage() {
    return (
        <div className="container">
            <div className="h-full mt-48 mb-24 flex flex-col justify-center gap-8 items-center ">
                {/* header */}
                <div className="flex flex-col gap-8 items-center  text-neutral-800 dark:text-neutral-50">
                    <div className="flex flex-col items-center text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Almost there...</h1>
                        <h2 className="text-2xl font-light mb-4"> We sent a verification link to the email you provided when signing up. </h2>
                        <h3 className="text-base font-light "> Make sure to check your junk/spam if you don't see it.</h3>
                    </div>
                    <img className="mt-8 w-1/3" src="/assets/verifying.svg" alt="verification sent" draggable="false"/>
                </div>
            </div>
        </div>
    )
}

export default observer(VerifyPage)