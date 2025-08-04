import React, {useState, useRef, useCallback, useEffect} from 'react';
import {MagnifyingGlassIcon, XMarkIcon} from "@heroicons/react/24/solid";
import {useNavigate} from "react-router-dom";
import {searchFunction} from "../../Commons/ApiFunction.ts";

interface SearchResult {
    id?: number;
    name?: string;
    type?: "dish" | "restaurant";
    image?: string;
}

const SearchBar = () => {
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // When click outside the search bar, close the results
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle search input change with debounce
    const handleSearchChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value;
        setQuery(searchQuery);

        if (searchQuery.length > 2) {
            debounceRef.current = setTimeout(async () => {
                setIsSearching(true);
                setShowResults(true);

                const searchResults = await searchFunction(searchQuery);
                setResults(searchResults.results);
                setIsSearching(false);
            }, 300);
        } else {
            setResults([]);
            setShowResults(false);
        }

    }, []);

    // Clear search input and results
    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setShowResults(false);
    }

    // Handle result click
    const handleResultClick = (result:SearchResult)=>{
        clearSearch();
        if(result?.type === 'restaurant'){
            navigate(`/restaurants/${result?.id}`)
        }
        else if(result.type === 'dish'){
            // display modal or navigate to dish
        }

    }

    return (
        <div className="relative" ref={searchRef}>
            <div className="relative">
                {/* Search Icon */}
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500"/>
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    value={query}
                    onChange={handleSearchChange}
                    placeholder="What do you want to eat today..."
                    className="bg-white w-80 p-3 pl-10 pr-10 text-sm rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-primary"/>

                {/* If query is not empty, show cancel button */}
                {query && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        aria-label="Clear search"
                    >
                        <XMarkIcon className="h-5 w-5 text-gray-500"/>
                    </button>
                )}
            </div>

            {/* Search Results */}
            {showResults && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
                    {isSearching ? (
                        <div className="p-4 text-center text-gray-500">Searching...</div>
                    ) : results?.length > 0 ? (
                        <ul className="py-2">
                            {results.map((result) => (
                                <li
                                    key={`${result.type}-${result.id}`}
                                    onClick={()=> handleResultClick(result)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                                    <div>
                                        <p className="font-medium">{result.name}</p>
                                        <p className="text-xs text-gray-500 capitalize">
                                            {result.type}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : query.length > 2 ? (
                        <div className="p-4 text-center text-gray-500">
                            No results found for "{query}"
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default SearchBar;