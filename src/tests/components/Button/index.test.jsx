import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../../../components/Button'

describe('Button', () => {
    it('deve renderizar como elemento <a> quando recebe href', () => {
        render(<Button href="/test">Click me</Button>)

        const link = screen.getByRole('link', { name: /click me/i })
        expect(link).toBeInTheDocument()
        expect(link.tagName).toBe('A')
        expect(link).toHaveAttribute('href', '/test')
    })

    it('deve renderizar como elemento <button> quando não recebe href', () => {
        render(<Button>Click me</Button>)

        const button = screen.getByRole('button', { name: /click me/i })
        expect(button).toBeInTheDocument()
        expect(button.tagName).toBe('BUTTON')
    })

    it('deve disparar onClick quando clicado', async () => {
        const handleClick = vi.fn()
        const user = userEvent.setup()

        render(<Button onClick={handleClick}>Click me</Button>)

        const button = screen.getByRole('button', { name: /click me/i })
        await user.click(button)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('deve passar outras props para o elemento button', () => {
        render(
            <Button type="submit" disabled data-testid="test-button">
                Submit
            </Button>
        )

        const button = screen.getByTestId('test-button')
        expect(button).toHaveAttribute('type', 'submit')
        expect(button).toBeDisabled()
    })

    it('deve passar outras props para o elemento anchor', () => {
        render(<Button href="/test">External Link</Button>)

        const link = screen.getByRole('link', { name: /external link/i })
        expect(link).toHaveAttribute('href', '/test')
    })
})
