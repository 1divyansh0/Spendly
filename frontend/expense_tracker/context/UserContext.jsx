import React,{createContext,useState} from "react";
export const UserContext = createContext();

const UserProvider = ({children})=>{
    const [user, setuser] = useState(null);


    //Function to update user data

    const updateUser = (userdata)=>{
        setuser(userdata);
    }

    //Function to clear user data;

    const clearuser = ()=>{
        setuser(null);
    };


    return (
        <UserContext.Provider
        value={{
            user,
            updateUser,
            clearuser
        }}>

            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;