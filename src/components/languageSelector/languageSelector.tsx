import React, { useContext, useState, useEffect, useCallback } from "react";
import { IconButton, Flex } from "@chakra-ui/react";
import { Languages } from "lucide-react";
import { ColorModeButton } from "../ui/color-mode";
import { LanguageContext } from "../../context/LanguageContext";
import { LanguageSelectorProps } from "../../types";

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
    const languageContext = useContext(LanguageContext);
    const { language, setLanguage } = languageContext || { language: 'zh', setLanguage: () => {} };
    const [opacity, setOpacity] = useState<number>(0);

    // Throttled scroll handler using useCallback for better performance
    const handleScroll = useCallback(() => {
        const shouldBeTransparent = window.scrollY > 0;
        setOpacity(shouldBeTransparent ? 0 : 0.8);
    }, []);

    useEffect(() => {
        // Run initial check
        handleScroll();
        
        // Only add scroll listener to window (most efficient)
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <Flex 
            justifyContent="flex-end" 
            p={2} 
            position="fixed"
            top={0}
            right={0}
            zIndex={1000}
        >
            <ColorModeButton style={{ opacity: opacity, transition: 'opacity 0.2s' }} />
            <IconButton
                size="sm"
                variant="ghost"
                aria-label="Toggle language"
                onClick={() => setLanguage(language === "en" ? "zh" : "en")}
                style={{ opacity: opacity, transition: 'opacity 0.2s' }}
            >
                <Languages size={18} />
            </IconButton>
        </Flex>
    );
};

export default LanguageSelector; 