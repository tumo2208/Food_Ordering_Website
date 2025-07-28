import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
    type Dispatch,
    type SetStateAction
} from 'react';
import type {User} from "../../Commons/Type.ts";

interface LayoutProps {
    children: ReactNode;
}

interface UserContextType {
    user: User;
    setUser: Dispatch<SetStateAction<User>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: LayoutProps) => {
    const [user, setUser] = useState<User>({
        id: "",
        email: "",
        name: "",
        phoneNumber: "",
        address: "",
        district: "",
        city: "",
        citizenId: "",
        dob: "",
        gender: "OTHER",
        restaurantId: "",
    });
    const [didLoad, setDidLoad] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        // console.log("Stored user data:", storedUser);
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setDidLoad(true);
    }, []);

    useEffect(() => {
        if (!didLoad) return;
        // console.log("UserContext updated:", user);
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};