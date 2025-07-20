import FoodTypesSection from "../../Components/Dashboard/FoodTypesSection.tsx";
import PopularDishesSection from "../../Components/Dashboard/PopularDishesSection.tsx";

const Dashboard = () => {
    return (
        <div className="py-8">
            {/* Banner */}
            <div className="bg-primary relative rounded-lg p-6 mb-8 flex items-center justify-between">
                <img src="/images/banner_2.png" alt="Discount Offer" className="h-48 object-cover"/>

                <div className="absolute p-8">
                    <div className="max-w-md">
                        <h2 className="text-2xl font-bold text-white mb-2">Get Discount Voucher</h2>
                        <h3 className="text-xl font-bold text-white mb-4">Up To 20%</h3>
                    </div>
                </div>
            </div>

            {/* Food Types Section */}
            <FoodTypesSection />

            {/* Popular Dishes Section */}
            <PopularDishesSection />

        </div>
    );
};

export default Dashboard;