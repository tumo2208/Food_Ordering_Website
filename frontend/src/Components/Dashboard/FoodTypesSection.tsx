import {foodTypeList} from "../../Commons/DataDummy.ts";
import {useEffect, useRef, useState} from "react";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/solid";
import {useNavigate} from "react-router-dom";

const FoodTypesSection = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [collapsedHeight, setCollapsedHeight] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            const row = containerRef.current.querySelector('div');
            if (row) {
                setCollapsedHeight(row.offsetHeight);
            }
        }
    }, [foodTypeList]);

    return (
        <div className="mb-8">
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold'>Food Types</h2>
            </div>

            <div
                ref={containerRef}
                className={`grid md:grid-cols-6 grid-cols-3 gap-4 overflow-hidden`}
                style={{
                    maxHeight: expanded ? `${9999}px` : `${collapsedHeight}px`,
                }}
            >
                {
                    foodTypeList.map((type) => (
                        <div key={type.id} className="bg-white rounded-lg p-4 flex flex-col items-center
                        justify-center cursor-pointer hover:shadow-md transition-shadow"
                             onClick={() => navigate(`/category/${type.name}`)}>
                            <div className='text-3xl mb-2'>
                                <img className='h-8 w-8' src={type.image} alt={type.name}/>
                            </div>
                            <span className='text-sm'>{type.Vietnamese}</span>
                        </div>
                    ))
                }
            </div>

            {
                foodTypeList.length > 6 && (
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="flex items-center justify-center w-8 h-8 mx-auto text-primary transition-colors"
                            aria-label={expanded ? 'Thu gọn' : 'Mở rộng'}
                        >
                            {expanded ? (
                                <ChevronUpIcon className="w-6 h-6"/>
                            ) : (
                                <ChevronDownIcon className="w-6 h-6"/>
                            )}
                        </button>
                    </div>
                )
            }
        </div>
    );
};

export default FoodTypesSection;