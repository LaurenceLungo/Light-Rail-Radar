import { describe, it, expect } from 'vitest';
import { translations } from './translations';

describe('translations', () => {
    describe('English translations', () => {
        const t = translations.en;

        it('platform() returns "Platform {number}"', () => {
            expect(t.platform('1')).toBe('Platform 1');
            expect(t.platform('3')).toBe('Platform 3');
        });

        it('autoUpdateMessage() returns correct message with seconds', () => {
            expect(t.autoUpdateMessage(10)).toBe('auto updated every 10s');
            expect(t.autoUpdateMessage(30)).toBe('auto updated every 30s');
        });

        it('has all required static string keys', () => {
            expect(t.endOfService).toBe('-End of Service-');
            expect(t.route).toBe('Route');
            expect(t.direction).toBe('Direction');
            expect(t.arrivalTime).toBe('Arrival');
            expect(t.cars).toBe('Cars');
            expect(t.updateTime).toBe('Update time');
            expect(t.addToBookmark).toBe('Add Bookmark');
            expect(t.removeFromBookmark).toBe('Remove Bookmark');
            expect(t.lineStopped).toBe('Line is stopped');
            expect(t.pleaseSelect).toBe('Please Select Station');
            expect(t.searchStation).toBe('Search station...');
        });
    });

    describe('Chinese translations', () => {
        const t = translations.zh;

        it('platform() returns "{number}號月台"', () => {
            expect(t.platform('1')).toBe('1號月台');
            expect(t.platform('3')).toBe('3號月台');
        });

        it('autoUpdateMessage() returns correct message with seconds', () => {
            expect(t.autoUpdateMessage(10)).toBe('每10秒自動更新');
            expect(t.autoUpdateMessage(30)).toBe('每30秒自動更新');
        });

        it('has all required static string keys', () => {
            expect(t.endOfService).toBe('-尾班車已過-');
            expect(t.route).toBe('路線');
            expect(t.direction).toBe('方向');
            expect(t.arrivalTime).toBe('到達時間');
            expect(t.cars).toBe('車卡數');
            expect(t.updateTime).toBe('更新時間');
            expect(t.addToBookmark).toBe('加至書籤');
            expect(t.removeFromBookmark).toBe('從書籤刪除');
            expect(t.lineStopped).toBe('路線暫停服務');
            expect(t.pleaseSelect).toBe('請選擇輕鐵站');
            expect(t.searchStation).toBe('搜尋車站...');
        });
    });

    it('both languages have the same set of keys', () => {
        const enKeys = Object.keys(translations.en).sort();
        const zhKeys = Object.keys(translations.zh).sort();
        expect(enKeys).toEqual(zhKeys);
    });
});
