import { useState, createContext } from "react";
export interface EmailContextType {
    email:string|null;
    setEmail:React.Dispatch<React.SetStateAction<string | null>>;
}
interface UserContextProviderProps {
    children: React.ReactNode;
}
export const Email = createContext<EmailContextType | null>(null);
export const EmailProvider: React.FC<UserContextProviderProps> = (props) => {
    const [email,setEmail]=useState<string|null>(null)
    return (
        <div>
            <Email.Provider value={{email,setEmail}}>
                {props.children}
            </Email.Provider>
        </div>
    );
};