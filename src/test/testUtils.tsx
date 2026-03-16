import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { LanguageContext } from '../context/LanguageContext';
import { ExpandedContext } from '../context/ExpandedContext';
import { Language } from '../types';

interface WrapperOptions {
    language?: Language;
    expanded?: boolean;
}

function createWrapper(options: WrapperOptions = {}) {
    const language = options.language ?? 'en';
    const expanded = options.expanded ?? false;
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <ChakraProvider value={defaultSystem}>
            <LanguageContext.Provider value={{ language, setLanguage: () => {} }}>
                <ExpandedContext.Provider value={{ expanded, setExpanded: () => {} }}>
                    {children}
                </ExpandedContext.Provider>
            </LanguageContext.Provider>
        </ChakraProvider>
    );
    return Wrapper;
}

function renderWithProviders(
    ui: React.ReactElement,
    options: WrapperOptions & Omit<RenderOptions, 'wrapper'> = {},
) {
    const { language, expanded, ...renderOptions } = options;
    return render(ui, { wrapper: createWrapper({ language, expanded }), ...renderOptions });
}

export { renderWithProviders };
