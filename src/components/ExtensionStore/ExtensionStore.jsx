import { useEffect, useState, useRef } from "react";
import PulseCard from "../Loading/PulseCard";
import Chunk from "lodash.chunk";
import Card from "../Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Search from "../../utils/Search";

export default function ExtensionStore() {
    const searchbox = useRef(null);
    const [storeData, setStoreData] = useState(null);
    const [currentPage, setCurrentPage] = useState([]);

    useEffect(() => {
        window.ScratchNative?.sendMessage("setActivity", "on S4D Store");
        window.ScratchNative?.onceMessage("fetchStore", (ev, data) => {
            const d = Chunk(data, 12);
            setStoreData(d);
            setCurrentPage(d[0]);
        });
        window.ScratchNative?.sendMessage("fetchStore");
    }, []);

    function paginate(back = false) {
        const currentPageIndex = back ? storeData.indexOf(currentPage) - 1 : storeData.indexOf(currentPage) + 1;
        setCurrentPage(storeData[currentPageIndex] || storeData[back ? storeData.length - 1 : 0]);
    }

    function handleSearch() {
        const query = searchbox.current?.value || "";
        if (!query) return;
        setCurrentPage(Search(query, storeData.flat()));
    }

    return (
        <div className="dark:bg-gray-900 bg-white h-screen w-full overflow-scroll">
            <div className="pt-5 px-20">
                <h1 className="dark:text-white text-gray-500 text-7xl">Store</h1>
                <div className="mt-10">
                    <div className="flex space-x-5 justify-center items-center">
                        <input onKeyDown={(e) => (e.keyCode === 13 ? handleSearch() : null)} type="text" ref={searchbox} className="form-input p-2 w-1/2 rounded-md bg-gray-50" />
                        <p onClick={handleSearch} className="rounded-md cursor-pointer text-white text-xl my-auto mx-auto bg-blurple-500 py-2 px-3 hover:bg-blurple-600">
                            Search
                        </p>
                    </div>
                    {Array.isArray(storeData) ? (
                        <div class="mt-10 flex items-center justify-center space-x-3 dark:text-white text-black w-full">
                            <p onClick={() => paginate(true)} className="text-2xl opacity-80 cursor-pointer hover:opacity-100">
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </p>
                            <h1 className="text-center text-xl opacity-90">
                                Page {storeData.indexOf(currentPage) + 1 || 0} of {storeData.length}
                            </h1>
                            <p onClick={() => paginate(false)} className="text-2xl opacity-80 cursor-pointer hover:opacity-100">
                                <FontAwesomeIcon icon={faArrowRight} />
                            </p>
                        </div>
                    ) : null}
                    <div className="mt-14">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">{!Array.isArray(storeData) ? new Array(20).fill(null).map((_, i) => <PulseCard key={i} />) : currentPage.map((m, i) => <Card key={i} data={m} />)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
