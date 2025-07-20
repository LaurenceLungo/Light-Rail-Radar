import React, { useContext, useState, useEffect, useCallback } from "react";
import { Button, Flex } from "@chakra-ui/react";
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
            gap={2} 
            p={2} 
            position="fixed"
            top={0}
            right={0}
            zIndex={1000}
        >
            <Button
                size="sm"
                variant={language === "en" ? "outline" : "subtle"}
                onClick={() => setLanguage("en")}
                style={{ opacity: opacity, transition: 'opacity 0.2s' }}
                colorScheme="white"
            >
                Eng
            </Button>
            <Button
                size="sm"
                variant={language === "zh" ? "outline" : "subtle"}
                onClick={() => setLanguage("zh")}
                style={{ opacity: opacity, transition: 'opacity 0.2s' }}
                colorScheme="white"
            >
                中文
            </Button>
        </Flex>
    );
};

export default LanguageSelector; 