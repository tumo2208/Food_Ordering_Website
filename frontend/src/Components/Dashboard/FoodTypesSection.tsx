import SectionLink from "../Link/SectionLink.tsx";
import {foodTypeList} from "../../Commons/DataDummy.ts";

const FoodTypesSection = () => {
    return (
        <div className="mb-8">
            <SectionLink label="Food Types" onClick={()=> {}}/>
            <div className="grid md:grid-cols-6 grid-cols-3 gap-4">
                {
                    foodTypeList?.map((type) => (
                        <div key={type.id} className="bg-white rounded-lg p-4 flex flex-col items-center
                        justify-center cursor-pointer hover:shadow-md transition-shadow">
                            <div className='test-3xl mb-2'>
                                <img className='h-8 w-8' src={type.image} alt={type.name}/>
                            </div>
                            <span className='text-sm'>{type.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FoodTypesSection;