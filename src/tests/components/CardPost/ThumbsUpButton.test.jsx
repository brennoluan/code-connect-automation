import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThumbsUpButton } from '../../../components/CardPost/ThumbsUpButton'

// Mock do Spinner
vi.mock('../../../components/Spinner', () => ({
    Spinner: () => <div data-testid="spinner">Loading...</div>,
}))

// Mock do IconButton
vi.mock('../../../components/IconButton', () => ({
    IconButton: ({ children, disabled, ...props }) => (
        <button disabled={disabled} {...props}>
            {children}
        </button>
    ),
}))

// Mock do IconThumbsUp
vi.mock('../../../components/icons/IconThumbsUp', () => ({
    IconThumbsUp: () => <svg data-testid="thumbs-up-icon" />,
}))

describe('ThumbsUpButton', () => {
    it('deve renderizar o ícone quando loading é false', () => {
        render(<ThumbsUpButton loading={false} />)

        expect(screen.getByTestId('thumbs-up-icon')).toBeInTheDocument()
        expect(screen.queryByTestId('spinner')).not.toBeInTheDocument()
    })

    it('deve renderizar o spinner quando loading é true', () => {
        render(<ThumbsUpButton loading={true} />)

        expect(screen.getByTestId('spinner')).toBeInTheDocument()
        expect(screen.queryByTestId('thumbs-up-icon')).not.toBeInTheDocument()
    })

    it('deve desabilitar o botão quando loading é true', () => {
        render(<ThumbsUpButton loading={true} />)

        const button = screen.getByRole('button')
        expect(button).toBeDisabled()
    })

    it('não deve desabilitar o botão quando loading é false', () => {
        render(<ThumbsUpButton loading={false} />)

        const button = screen.getByRole('button')
        expect(button).not.toBeDisabled()
    })
})
