function RackListEmpty() {
    return (
        <div className="lg:h-[33vh] w-full z-0 lg:mt-24 flex flex-col justify-end lg:flex-row lg:justify-center items-start">
            <div className="flex flex-col items-start gap-6">
                <h2 className="max-w-2xl mt-6 text-base lg:text-xl text-neutral-400 dark:text-neutral-700">
                    Looks like this rack is empty!
                </h2>
            </div>
            <img className="hidden lg:flex w-[15%] mt-12 lg:mt-0" src="/assets/empty.svg" alt="hero" draggable="false" />
        </div>
    )
}

export default RackListEmpty

