import React, {createContext, useState, useContext} from 'react';

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [data, setData] = useState({});

    const setValues = (values) => {
        setData(prevData => ({
            ...prevData,
            ...values
        }))
    }

    console.log('data', data)

    return <DataContext.Provider value={{data, setValues}}>
        {children}
    </DataContext.Provider>
}

export const useData = () => useContext(DataContext);
