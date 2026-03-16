import React, { useContext, useState, useEffect, useCallback } from "react";
import { IconButton, Flex } from "@chakra-ui/react";
import { Languages, ListChevronsUpDown, ListChevronsDownUp } from "lucide-react";
import { ColorModeButton } from "../ui/color-mode";
import { LanguageContext } from "../../context/LanguageContext";
import { ExpandedContext } from "../../context/ExpandedContext";
import { LanguageSelectorProps } from "../../types";

const LanguageSelector: React.FC<LanguageSelectorProps> = () => {
    const languageContext = useContext(LanguageContext);
    const { language, setLanguage } = languageContext || { language: 'zh', setLanguage: () => {} };
    const expandedContext = useContext(ExpandedContext);
    const { expanded, setExpanded } = expandedContext || { expanded: false, setExpanded: () => {} };
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
        <>
            <Flex
                justifyContent="flex-start"
                p={2}
                position="fixed"
                top={0}
                left={0}
                zIndex={1000}
            >
                <IconButton
                    size="sm"
                    variant="ghost"
                    aria-label={expanded ? "Collapse rows" : "Expand rows"}
                    aria-pressed={expanded}
                    onClick={() => setExpanded(!expanded)}
                    style={{ opacity: opacity, transition: 'opacity 0.2s' }}
                >
                    {expanded ? <ListChevronsDownUp size={18} /> : <ListChevronsUpDown size={18} />}
                </IconButton>
            </Flex>
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
        </>
    );
};

export default LanguageSelector; 