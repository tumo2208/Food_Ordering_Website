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
import {getUserProfile} from "../../Commons/ApiFunction.ts";

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
        role: "CUSTOMER",
        restaurantId: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);
            } catch (error) {
                console.error("Bạn chưa đăng nhập");
            }
        }
        fetchUser();
    }, []);

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