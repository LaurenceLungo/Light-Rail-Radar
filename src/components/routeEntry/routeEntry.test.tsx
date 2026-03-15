import React from 'react';
import { screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Table } from '@chakra-ui/react';
import RouteEntry from './routeEntry';
import { Route } from '../../types';
import { renderWithProviders } from '../../test/testUtils';

const baseRoute: Route = {
    route_id: 'r1',
    route_name: 'Test Route',
    direction: 'outbound',
    service_type: '1',
    eta_list: [],
    route_no: '507',
    dest_ch: '天水圍',
    dest_en: 'Tin Shui Wai',
    time_ch: '3分鐘',
    time_en: '3 min',
    train_length: 2,
};

// RouteEntry renders a Table.Row, which requires a Table.Root context
const TableWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Table.Root>
        <Table.Body>{children}</Table.Body>
    </Table.Root>
);

describe('RouteEntry', () => {
    it('renders the route number', () => {
        renderWithProviders(<TableWrapper><RouteEntry route={baseRoute} /></TableWrapper>);
        expect(screen.getByText('507')).toBeInTheDocument();
    });

    it('renders English destination when language is "en"', () => {
        renderWithProviders(<TableWrapper><RouteEntry route={baseRoute} /></TableWrapper>, { language: 'en' });
        expect(screen.getByText('Tin Shui Wai')).toBeInTheDocument();
        expect(screen.queryByText('天水圍')).not.toBeInTheDocument();
    });

    it('renders Chinese destination when language is "zh"', () => {
        renderWithProviders(<TableWrapper><RouteEntry route={baseRoute} /></TableWrapper>, { language: 'zh' });
        expect(screen.getByText('天水圍')).toBeInTheDocument();
        expect(screen.queryByText('Tin Shui Wai')).not.toBeInTheDocument();
    });

    it('renders English arrival time when language is "en"', () => {
        renderWithProviders(<TableWrapper><RouteEntry route={baseRoute} /></TableWrapper>, { language: 'en' });
        expect(screen.getByText('3 min')).toBeInTheDocument();
    });

    it('renders Chinese arrival time when language is "zh"', () => {
        renderWithProviders(<TableWrapper><RouteEntry route={baseRoute} /></TableWrapper>, { language: 'zh' });
        expect(screen.getByText('3分鐘')).toBeInTheDocument();
    });

    it('renders the train length', () => {
        renderWithProviders(<TableWrapper><RouteEntry route={baseRoute} /></TableWrapper>);
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('shows "Line is stopped" in English when stop is 1', () => {
        const stoppedRoute: Route = { ...baseRoute, stop: 1 };
        renderWithProviders(<TableWrapper><RouteEntry route={stoppedRoute} /></TableWrapper>, { language: 'en' });
        expect(screen.getByText('Line is stopped')).toBeInTheDocument();
        expect(screen.queryByText('3 min')).not.toBeInTheDocument();
    });

    it('shows Chinese stopped message when stop is 1 and language is "zh"', () => {
        const stoppedRoute: Route = { ...baseRoute, stop: 1 };
        renderWithProviders(<TableWrapper><RouteEntry route={stoppedRoute} /></TableWrapper>, { language: 'zh' });
        expect(screen.getByText('路線暫停服務')).toBeInTheDocument();
        expect(screen.queryByText('3分鐘')).not.toBeInTheDocument();
    });

    it('shows arrival time when stop is 0', () => {
        const runningRoute: Route = { ...baseRoute, stop: 0 };
        renderWithProviders(<TableWrapper><RouteEntry route={runningRoute} /></TableWrapper>, { language: 'en' });
        expect(screen.getByText('3 min')).toBeInTheDocument();
        expect(screen.queryByText('Line is stopped')).not.toBeInTheDocument();
    });
});
