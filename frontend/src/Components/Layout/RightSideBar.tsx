import Cart from '../Cart/Cart.tsx'
import {isAuthenticated, isRestaurantOwner} from "../../Commons/ApiFunction.ts";
import {useState, useEffect} from "react";

const RightSideBar = () => {
    const [loginState, setLoginState] = useState(false);
    const [restaurantOwner, setRestaurantOwner] = useState(false);

    useEffect(() => {
        const authenticated = isAuthenticated();
        setRestaurantOwner(isRestaurantOwner());
        setLoginState(authenticated);
    }, []);

    if (restaurantOwner || !loginState) return null;

    return (
        <div className='mt-4 p-4 md:min-w-50'>
            <Cart />
        </div>
    );
}

export default RightSideBar