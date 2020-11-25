import React from 'react'
import { render } from '@testing-library/react';
import Header from './Header';

describe("<Header>", () =>
    it.each(["My Header", "Another Header"])
        ('shows %s as the specified title', (title: string) => {
            const { getByRole } = render(<Header title={title} />)

            expect(getByRole("heading")).toHaveTextContent(title);
        })
)