import React, { createContext, useState } from 'react';
import { ExpandedContextType, ExpandedProviderProps } from '../types';

const STORAGE_KEY = 'expanded';

export const ExpandedContext = createContext<ExpandedContextType | undefined>(undefined);

export const ExpandedProvider: React.FC<ExpandedProviderProps> = ({ children }) => {
    const [expanded, setExpandedState] = useState<boolean>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved !== null ? saved === 'true' : false;
    });

    const setExpanded = (value: boolean) => {
        localStorage.setItem(STORAGE_KEY, String(value));
        setExpandedState(value);
    };

    return (
        <ExpandedContext.Provider value={{ expanded, setExpanded }}>
            {children}
        </ExpandedContext.Provider>
    );
};
