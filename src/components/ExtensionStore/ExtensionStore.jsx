export default function ExtensionStore() {
    return (
        <div className="dark:bg-gray-900 bg-white h-screen w-full overflow-scroll">
            <div className="pt-5 px-20">
                <h1 className="dark:text-white text-gray-500 text-7xl">Store</h1>
                <div className="mt-10">
                    <div className="flex space-x-5 justify-center items-center">
                        <input type="text" name="query" id="searchQuery" className="form-input p-2 w-1/2 rounded-md bg-gray-50" />
                        <p className="rounded-md cursor-pointer text-white text-xl my-auto mx-auto bg-blurple-500 py-2 px-3 hover:bg-blurple-600">Search</p>
                    </div>
                    <div className="mt-14">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
                            {new Array(50).fill(null).map((_, i) => (
                                <div key={i} className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                                        <div className="flex-1 space-y-4 py-1">
                                            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-400 rounded"></div>
                                                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
