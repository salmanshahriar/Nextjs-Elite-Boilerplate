import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { Button } from './button';

const messages = { common: { loading: 'Loading...' } };

const renderButton = (ui: ReactElement) =>
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );

describe('Button', () => {
  it('renders with children', () => {
    renderButton(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it('applies variant and size via class', () => {
    const { container } = renderButton(
      <Button variant="secondary" size="sm">
        Secondary
      </Button>,
    );
    const button = container.querySelector('button');
    expect(button).toHaveClass('bg-secondary');
    expect(button).toHaveClass('h-8');
  });

  it('shows loading state and disables the button', () => {
    renderButton(<Button loading>Submit</Button>);
    const button = screen.getByRole('button', { name: /loading/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Loading...');
  });
});
