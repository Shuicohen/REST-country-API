import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CountryCard from '../CountryCard.jsx';
import { describe, it, expect } from 'vitest';

const sampleCountry = {
  name: 'France',
  population: 67000000,
  region: 'Europe',
  capital: 'Paris',
  flag_url: 'https://flagcdn.com/fr.svg'
};

describe('CountryCard', () => {
  it('renders country information and flag', () => {
    render(
      <MemoryRouter>
        <CountryCard country={sampleCountry} theme="light" />
      </MemoryRouter>
    );

    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText(/population/i)).toHaveTextContent(
      sampleCountry.population.toLocaleString()
    );
    expect(screen.getByText(/region/i)).toHaveTextContent('Europe');
    expect(screen.getByText(/capital/i)).toHaveTextContent('Paris');

    const flagImg = screen.getByAltText('France flag');
    expect(flagImg).toBeInTheDocument();
    expect(flagImg).toHaveAttribute('src', sampleCountry.flag_url);
  });
});
