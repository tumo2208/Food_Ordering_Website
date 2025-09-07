import { useState } from "react";
import { FoodTypeMap } from "../../Commons/DataDummy.ts";

const cuisineOptions = Object.keys(FoodTypeMap);

interface CuisineTypeSelectorProps {
    selected: string[];
    setSelected: (types: string[]) => void;
}

const CuisineTypeSelector = ({ selected, setSelected }:CuisineTypeSelectorProps) => {
    const [search, setSearch] = useState("");
    const filteredOptions = cuisineOptions.filter(
        key =>
            FoodTypeMap[key].toLowerCase().includes(search.toLowerCase()) &&
            !selected.includes(key)
    );
    const addType = (key: string) => setSelected([...selected, key]);
    const removeType = (key: string) => setSelected(selected.filter(t => t !== key));

    return (
        <div className="mb-4">
            <label className="font-medium block mb-2">Phong cách ẩm thực</label>
            <div className="border rounded-md p-4 bg-gray-50">
                <div className="flex flex-wrap gap-2 mb-2">
                    {selected.map((key, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center"
                        >
                            {FoodTypeMap[key]}
                            <button
                                type="button"
                                className="ml-2 text-red-500 font-bold"
                                onClick={() => removeType(key)}
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    className="w-full border rounded px-3 py-2 mb-2"
                    placeholder="Tìm kiếm phong cách ẩm thực..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="flex flex-wrap gap-2">
                    {filteredOptions.map(key => (
                        <button
                            key={key}
                            type="button"
                            className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm hover:bg-amber-200"
                            onClick={() => addType(key)}
                        >
                            {FoodTypeMap[key]}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CuisineTypeSelector;