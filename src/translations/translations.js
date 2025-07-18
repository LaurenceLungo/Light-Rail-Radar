export const translations = {
    en: {
        platform: (platformNumber) => `Platform ${platformNumber}`,
        endOfService: '-End of Service-',
        route: 'Route',
        direction: 'Direction',
        arrivalTime: 'Arrival',
        cars: 'Cars',
        updateTime: 'Update time',
        addToBookmark: 'Add Bookmark',
        removeFromBookmark: 'Remove Bookmark',
        autoUpdateMessage: (seconds) => `auto updated every ${seconds}s`,
    },
    zh: {
        platform: (platformNumber) => `${platformNumber}號月台`,
        endOfService: '-尾班車已過-',
        route: '路線',
        direction: '方向',
        arrivalTime: '到達時間',
        cars: '車卡數',
        updateTime: '更新時間',
        addToBookmark: '加至書籤',
        removeFromBookmark: '從書籤刪除',
        autoUpdateMessage: (seconds) => `每${seconds}秒自動更新`,
    }
};