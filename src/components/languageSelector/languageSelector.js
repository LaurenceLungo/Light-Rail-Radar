import { useContext, useState, useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { LanguageContext } from "../../context/LanguageContext";

export default function LanguageSelector() {
    const { language, setLanguage } = useContext(LanguageContext);
    const [opacity, setOpacity] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const shouldBeTransparent = window.scrollY > 0;
            setOpacity(shouldBeTransparent ? 0 : 0.8);
        };
        
        // Run initial check
        handleScroll();
        
        // Add scroll listeners to multiple targets
        window.addEventListener('scroll', handleScroll, { passive: true });
        document.addEventListener('scroll', handleScroll, { passive: true });
        document.body.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('scroll', handleScroll);
            document.body.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
                variant={language === "en" ? "solid" : "outline"}
                onClick={() => setLanguage("en")}
                style={{ opacity: opacity, transition: 'opacity 0.2s' }}
                colorScheme="blue"
            >
                Eng
            </Button>
            <Button
                size="sm"
                variant={language === "zh" ? "solid" : "outline"}
                onClick={() => setLanguage("zh")}
                style={{ opacity: opacity, transition: 'opacity 0.2s' }}
                colorScheme="blue"
            >
                中文
            </Button>
        </Flex>
    );
}