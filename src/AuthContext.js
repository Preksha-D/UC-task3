import React, {useState, useEffect, useContext} from 'react'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider(props){
    const [authUser, setAuthUser] = useState(null);
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
          setAuthUser(savedToken);
          setIsLoggedin(isLoggedin);
        }
      }, []);


    const value = {
        authUser,
        setAuthUser,
        isLoggedin,
        setIsLoggedin
    }

    return(
        <AuthContext.Provider value = {value}> {props.children}</AuthContext.Provider>
    )
}