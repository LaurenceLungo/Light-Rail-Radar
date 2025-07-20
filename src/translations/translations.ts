import { Translations } from '../types';

export const translations: Translations = {
    en: {
        platform: (platformNumber: string) => `Platform ${platformNumber}`,
        endOfService: '-End of Service-',
        route: 'Route',
        direction: 'Direction',
        arrivalTime: 'Arrival',
        cars: 'Cars',
        updateTime: 'Update time',
        addToBookmark: 'Add Bookmark',
        removeFromBookmark: 'Remove Bookmark',
        autoUpdateMessage: (seconds: number) => `auto updated every ${seconds}s`,
        lineStopped: 'Line is stopped',
        pleaseSelect: 'Please Select Light Rail Station',
    },
    zh: {
        platform: (platformNumber: string) => `${platformNumber}號月台`,
        endOfService: '-尾班車已過-',
        route: '路線',
        direction: '方向',
        arrivalTime: '到達時間',
        cars: '車卡數',
        updateTime: '更新時間',
        addToBookmark: '加至書籤',
        removeFromBookmark: '從書籤刪除',
        autoUpdateMessage: (seconds: number) => `每${seconds}秒自動更新`,
        lineStopped: '路線暫停服務',
        pleaseSelect: '請選擇輕鐵站',
    }
}; 