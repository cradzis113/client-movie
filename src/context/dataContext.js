import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {

    const [character, setCharacter] = useState([]);
    const [episode, setEpisode] = useState([]);
    const [resetData, setResetData] = useState(false);
    const [preventAddCharacter, setPreventAddCharacter] = useState(false);

    const value = { character, setCharacter, episode, setEpisode, resetData, setResetData, preventAddCharacter, setPreventAddCharacter };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};
