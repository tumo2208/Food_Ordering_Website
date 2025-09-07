interface PaginationProps {
    page: number;
    setPage: (page: number) => void;
    totalPages: number;
}

const Pagination = ({page, setPage, totalPages}: PaginationProps) => {
    return (
        <div className="flex justify-center items-center space-x-2 mt-4">
            <button
                className="px-3 py-1 bg-gray-200 rounded"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
            >
                {"<"}
            </button>
            {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                (p === 1 || p === totalPages || Math.abs(p - page) <= 1) ? (
                    <button
                        key={p}
                        className={`px-3 py-1 rounded ${page === p ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </button>
                ) : (
                    (p === page - 2 || p === page + 2) && (
                        <span key={p} className="px-2">...</span>
                    )
                )
            ))}
            <button
                className="px-3 py-1 bg-gray-200 rounded"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
            >
                {">"}
            </button>
        </div>
    );
};

export default Pagination;