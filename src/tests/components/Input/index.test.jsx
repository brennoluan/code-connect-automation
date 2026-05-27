import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '../../../components/Input'

describe('Input', () => {
    it('deve renderizar um input element', () => {
        render(<Input />)

        const input = screen.getByRole('textbox')
        expect(input).toBeInTheDocument()
        expect(input.tagName).toBe('INPUT')
    })

    it('deve propagar props placeholder', () => {
        render(<Input placeholder="Digite seu nome" />)

        const input = screen.getByPlaceholderText('Digite seu nome')
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('placeholder', 'Digite seu nome')
    })

    it('deve propagar prop type', () => {
        render(<Input type="email" />)

        const input = screen.getByRole('textbox')
        expect(input).toHaveAttribute('type', 'email')
    })

    it('deve propagar prop type password', () => {
        const { container } = render(<Input type="password" />)

        const input = container.querySelector('input[type="password"]')
        expect(input).toBeInTheDocument()
        expect(input).toHaveAttribute('type', 'password')
    })

    it('deve permitir digitação e atualizar valor', async () => {
        const user = userEvent.setup()
        render(<Input />)

        const input = screen.getByRole('textbox')
        await user.type(input, 'Hello World')

        expect(input).toHaveValue('Hello World')
    })

    it('deve funcionar com value controlado', () => {
        render(<Input value="Controlled Value" readOnly />)

        const input = screen.getByRole('textbox')
        expect(input).toHaveValue('Controlled Value')
    })

    it('deve propagar prop disabled', () => {
        render(<Input disabled />)

        const input = screen.getByRole('textbox')
        expect(input).toBeDisabled()
    })

    it('deve propagar prop required', () => {
        render(<Input required />)

        const input = screen.getByRole('textbox')
        expect(input).toBeRequired()
    })

    it('deve propagar prop aria-label', () => {
        render(<Input aria-label="Email address" />)

        const input = screen.getByLabelText('Email address')
        expect(input).toBeInTheDocument()
    })

    it('deve propagar prop data-testid', () => {
        render(<Input data-testid="test-input" />)

        const input = screen.getByTestId('test-input')
        expect(input).toBeInTheDocument()
    })
})
