import Cart from '../Cart/Cart.tsx'
import {useState, useEffect} from "react";
import {useUser} from "../../Context/User/UserContext.tsx";

const RightSideBar = () => {
    const { user } = useUser();
    const [loginState, setLoginState] = useState(false);
    const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);

    useEffect(() => {
        const authenticated = user !== null && user.email !== "";
        if (authenticated && user.role === "RESTAURANT_OWNER") {
            setIsRestaurantOwner(true);
        } else {
            setIsRestaurantOwner(false);
        }
        setLoginState(authenticated);
        setLoginState(authenticated);
    }, []);

    if (isRestaurantOwner || !loginState) return null;

    return (
        <div className='mt-4 p-4 md:min-w-50'>
            <Cart />
        </div>
    );
}

export default RightSideBar