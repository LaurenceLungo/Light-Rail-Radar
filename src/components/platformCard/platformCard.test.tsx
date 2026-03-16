import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PlatformCard from './platformCard';
import { Platform, Route } from '../../types';
import { renderWithProviders } from '../../test/testUtils';

const sampleRoute: Route = {
    route_id: 'r1',
    route_name: 'Test Route',
    direction: 'outbound',
    service_type: '1',
    eta_list: [],
    route_no: '610',
    dest_ch: '元朗',
    dest_en: 'Yuen Long',
    time_ch: '5分鐘',
    time_en: '5 min',
    train_length: 3,
};

describe('PlatformCard', () => {
    describe('when route_list is null (end of service)', () => {
        const platform: Platform = {
            platform_id: '1',
            platform_name: 'Platform 1',
            route_list: null as unknown as Route[],
        };

        it('shows the platform label in English', () => {
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'en' });
            expect(screen.getByText('Platform 1')).toBeInTheDocument();
        });

        it('shows the platform label in Chinese', () => {
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'zh' });
            expect(screen.getByText('1號月台')).toBeInTheDocument();
        });

        it('shows the end-of-service notice in English', () => {
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'en' });
            expect(screen.getByText('-End of Service-')).toBeInTheDocument();
        });

        it('shows the end-of-service notice in Chinese', () => {
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'zh' });
            expect(screen.getByText('-尾班車已過-')).toBeInTheDocument();
        });
    });

    describe('when route_list has routes', () => {
        const platform: Platform = {
            platform_id: '2',
            platform_name: 'Platform 2',
            route_list: [sampleRoute],
        };

        it('shows the platform label in English', () => {
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'en' });
            expect(screen.getByText('Platform 2')).toBeInTheDocument();
        });

        it('shows column headers in English', () => {
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'en' });
            expect(screen.getByText('Route')).toBeInTheDocument();
            expect(screen.getByText('Direction')).toBeInTheDocument();
            expect(screen.getByText('Arrival')).toBeInTheDocument();
            expect(screen.getByText('Cars')).toBeInTheDocument();
        });

        it('shows column headers in Chinese', () => {
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'zh' });
            expect(screen.getByText('路線')).toBeInTheDocument();
            expect(screen.getByText('方向')).toBeInTheDocument();
            expect(screen.getByText('到達時間')).toBeInTheDocument();
            expect(screen.getByText('車卡數')).toBeInTheDocument();
        });

        it('renders a row for each route', () => {
            const platformWithTwoRoutes: Platform = {
                ...platform,
                route_list: [sampleRoute, { ...sampleRoute, route_id: 'r2', route_no: '507' }],
            };
            renderWithProviders(<PlatformCard platform={platformWithTwoRoutes} />, { language: 'en' });
            expect(screen.getByText('610')).toBeInTheDocument();
            expect(screen.getByText('507')).toBeInTheDocument();
        });

        it('does not show the end-of-service notice when routes are present', () => {
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'en' });
            expect(screen.queryByText('-End of Service-')).not.toBeInTheDocument();
        });
    });

    describe('row limit (maxRows)', () => {
        const makeRoutes = (count: number): Route[] =>
            Array.from({ length: count }, (_, i) => ({
                ...sampleRoute,
                route_id: `r${i}`,
                route_no: `${600 + i}`,
            }));

        it('shows at most maxRows rows when not expanded', () => {
            const platform: Platform = {
                platform_id: '3',
                platform_name: 'Platform 3',
                route_list: makeRoutes(6),
            };
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'en', expanded: false });
            // config.maxRows is 3 — only first 3 routes should appear
            expect(screen.getByText('600')).toBeInTheDocument();
            expect(screen.getByText('602')).toBeInTheDocument();
            expect(screen.queryByText('603')).not.toBeInTheDocument();
            expect(screen.queryByText('605')).not.toBeInTheDocument();
        });

        it('shows all rows when expanded', () => {
            const platform: Platform = {
                platform_id: '3',
                platform_name: 'Platform 3',
                route_list: makeRoutes(6),
            };
            renderWithProviders(<PlatformCard platform={platform} />, { language: 'en', expanded: true });
            expect(screen.getByText('600')).toBeInTheDocument();
            expect(screen.getByText('605')).toBeInTheDocument();
        });
    });
});
