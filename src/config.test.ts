import { describe, it, expect } from 'vitest';
import config from './config';

describe('config', () => {
    it('has a valid etaURL', () => {
        expect(config.etaURL).toBe('https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule');
    });

    it('has a positive refreshInterval in milliseconds', () => {
        expect(config.refreshInterval).toBeGreaterThan(0);
    });

    it('contains at least one station in stationName', () => {
        expect(Object.keys(config.stationName).length).toBeGreaterThan(0);
    });

    it('every station has a name, zone, lat and long', () => {
        for (const [id, station] of Object.entries(config.stationName)) {
            expect(station.name, `station ${id} missing name`).toBeTruthy();
            expect(station.zone, `station ${id} missing zone`).toBeTruthy();
            expect(typeof station.lat, `station ${id} lat must be a number`).toBe('number');
            expect(typeof station.long, `station ${id} long must be a number`).toBe('number');
        }
    });

    it('station coordinates are within Hong Kong bounds', () => {
        for (const [id, station] of Object.entries(config.stationName)) {
            expect(station.lat, `station ${id} lat out of range`).toBeGreaterThan(22.1);
            expect(station.lat, `station ${id} lat out of range`).toBeLessThan(22.6);
            expect(station.long, `station ${id} long out of range`).toBeGreaterThan(113.8);
            expect(station.long, `station ${id} long out of range`).toBeLessThan(114.4);
        }
    });

    it('station names contain both Chinese and English text', () => {
        for (const [id, station] of Object.entries(config.stationName)) {
            expect(station.name, `station ${id} name should contain English`).toMatch(/[A-Za-z]/);
            expect(station.name, `station ${id} name should contain Chinese`).toMatch(/[\u4e00-\u9fff]/);
        }
    });

    it('station IDs are numeric strings', () => {
        for (const id of Object.keys(config.stationName)) {
            expect(Number.isNaN(Number(id)), `station id "${id}" should be numeric`).toBe(false);
        }
    });
});
