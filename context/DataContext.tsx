import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DataContext = {
    name: { first: string, last: string } | null | undefined;
    email: string | null | undefined;
    updateName: (name: { first: string, last: string }) => void;
    updateEmail: (email: string) => void;
    updateFirst: (first: string) => void;
    updateLast: (last: string) => void;
    logout: () => void;
}

const dataContext = createContext({} as DataContext);

export function useData() {
    return useContext(dataContext);
}

export function DataProvider({ children }: { children: React.ReactNode }) {

    const [name, setName] = useState<{ first: string, last: string } | null>();
    const [email, setEmail] = useState<string | null>();

    // load data from async storage
    useEffect(() => {
        AsyncStorage.multiGet(['name.first', 'name.last', 'email']).then(([first, last, email]) => {
            setName(first ? { first: first[1] ?? '', last: last[1] ?? '' } : null);
            setEmail(email[1] ?? null);
        });
    }, []);

    const updateName = (name: { first: string, last: string }) => {
        setName(name);
        AsyncStorage.multiSet([
            ['name.first', name.first],
            ['name.last', name.last]
        ]);
    };

    const updateEmail = (email: string) => {
        setEmail(email);
        AsyncStorage.setItem('email', email);
    };

    const updateFirst = (first: string) => {
        setName(p => p ? ({ ...p, first }) : null);
        AsyncStorage.setItem('name.first', first);
    }

    const updateLast = (last: string) => {
        setName(p => p ? ({ ...p, last }) : null);
        AsyncStorage.setItem('name.last', last);
    }

    const logout = () => {
        AsyncStorage.multiRemove(['name.first', 'name.last', 'email']);
        setName(null);
        setEmail(null);
    }

    return (
        <dataContext.Provider value={{
            name,
            email,
            updateName,
            updateEmail,
            updateFirst,
            updateLast,
            logout
        }}>
            {children}
        </dataContext.Provider>
    )
};