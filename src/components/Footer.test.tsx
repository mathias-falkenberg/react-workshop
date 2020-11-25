import React from 'react'
import { render } from '@testing-library/react';
import Footer from './Footer';

describe("<Footer>", () =>
    it('shows the expected content', () => {
        const { getByRole } = render(<Footer>Powered by React!</Footer>)

        expect(getByRole("contentinfo")).toHaveTextContent("Powered by React!");
    })
)