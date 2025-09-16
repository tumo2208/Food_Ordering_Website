import Cart from '../Cart/Cart.tsx'
import {useState, useEffect} from "react";
import {useUser} from "../../Context/User/UserContext.tsx";

const RightSideBar = () => {
    const { user } = useUser();
    const [loginState, setLoginState] = useState(false);

    useEffect(() => {
        const authenticated = user !== null && user.email !== "";
        setLoginState(authenticated);
    }, [user]);

    if (!loginState) return null;

    return (
        <div className='mt-4 p-4 md:min-w-50'>
            <Cart />
        </div>
    );
}

export default RightSideBar