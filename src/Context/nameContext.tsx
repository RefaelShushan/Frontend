import { useState, createContext } from "react";
export interface NameContextType {
    name:string|null;
    setName:React.Dispatch<React.SetStateAction<string | null>>;
}
interface UserContextProviderProps {
    children: React.ReactNode;
}
export const Name = createContext<NameContextType | null>(null);
export const NameProvider: React.FC<UserContextProviderProps> = (props) => {
    const [name,setName]=useState<string|null>(null)
  return (
      <div>
          <Name.Provider value={{name,setName}}>
              {props.children}
          </Name.Provider>
      </div>
  );
};