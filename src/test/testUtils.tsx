import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { LanguageContext } from '../context/LanguageContext';
import { Language } from '../types';

interface WrapperOptions {
    language?: Language;
}

function createWrapper(options: WrapperOptions = {}) {
    const language = options.language ?? 'en';
    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
        <ChakraProvider value={defaultSystem}>
            <LanguageContext.Provider value={{ language, setLanguage: () => {} }}>
                {children}
            </LanguageContext.Provider>
        </ChakraProvider>
    );
    return Wrapper;
}

function renderWithProviders(
    ui: React.ReactElement,
    options: WrapperOptions & Omit<RenderOptions, 'wrapper'> = {},
) {
    const { language, ...renderOptions } = options;
    return render(ui, { wrapper: createWrapper({ language }), ...renderOptions });
}

export { renderWithProviders };
