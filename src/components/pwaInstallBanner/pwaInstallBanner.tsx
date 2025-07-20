import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Icon,
  useToast,
} from '@chakra-ui/react';
import { DownloadIcon, CloseIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { LanguageContext } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';
import styles from './pwaInstallBanner.module.css';

const PWAInstallBanner: React.FC = () => {
  const { language } = useContext(LanguageContext)!;
  const [isVisible, setIsVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const toast = useToast();

  const t = translations[language];

  useEffect(() => {
    // Show banner after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Check if app is already installed
    const handleAppInstalled = () => {
      setIsVisible(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = () => {
    setShowInstructions(true);
  };

  const handleShare = async () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Light Rail Radar',
          text: 'Check Hong Kong Light Rail arrival times quickly',
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or share failed; do nothing
      }
    }
    // If not supported, do nothing (instructions are already shown)
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store dismissal in localStorage to avoid showing again for a while
    localStorage.setItem('pwaBannerDismissed', Date.now().toString());
  };

  // Don't show if already dismissed recently (within 24 hours)
  useEffect(() => {
    const dismissed = localStorage.getItem('pwaBannerDismissed');
    if (dismissed) {
      const dismissedTime = parseInt(dismissed);
      const now = Date.now();
      const hoursSinceDismissed = (now - dismissedTime) / (1000 * 60 * 60);
      
      if (hoursSinceDismissed < 24) {
        setIsVisible(false);
      }
    }
  }, []);

  // Don't show on desktop browsers
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) {
      setIsVisible(false);
    }
  }, []);

  // Don't show if app is already installed (standalone mode)
  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <Box
      className={`${styles.banner} ${isVisible ? styles.bannerVisible : ''}`}
      bg="gray.800"
      borderTop="1px solid"
      borderColor="gray.700"
      p={4}
    >
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between" align="flex-start">
          <VStack align="flex-start" spacing={1} flex={1}>
            <Text fontWeight="bold" fontSize="md" color="white">
              {showInstructions ? t.pwaInstructionsTitle : t.pwaInstallTitle}
            </Text>
            <Text fontSize="sm" color="gray.300">
              {showInstructions ? t.pwaInstructionsMessage : t.pwaInstallMessage}
            </Text>
          </VStack>
          <Button
            size="sm"
            variant="ghost"
            color="gray.400"
            onClick={handleDismiss}
            minW="auto"
            p={1}
          >
            <Icon as={CloseIcon} />
          </Button>
        </HStack>
        
        {showInstructions && (
          <Button
            leftIcon={<Icon as={DownloadIcon} />}
            colorScheme="blue"
            size="sm"
            onClick={handleShare}
            w="full"
          >
            {t.pwaShareButton}
          </Button>
        )}
        {!showInstructions && (
          <Button
            leftIcon={<Icon as={DownloadIcon} />}
            colorScheme="blue"
            size="sm"
            onClick={handleInstall}
            w="full"
          >
            {t.pwaInstallButton}
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default PWAInstallBanner; 