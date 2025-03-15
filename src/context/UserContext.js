import { createContext, useEffect, useMemo, useState } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const storedUser = useMemo(() => JSON.parse(localStorage.getItem('user')) || null, []);
    const [user, setUser] = useState(storedUser);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (userData) => setUser(userData);
    const logout = () => setUser(null);

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };

