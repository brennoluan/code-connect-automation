import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Link } from '../../../components/Link'
import { renderWithRouter } from '../../utils'

describe('Link', () => {
    it('deve renderizar um link com href mapeado para prop to', () => {
        renderWithRouter(<Link href="/blog-post/test">Ver post</Link>)

        const link = screen.getByRole('link', { name: /ver post/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/blog-post/test')
    })

    it('deve renderizar children corretamente', () => {
        renderWithRouter(<Link href="/home">Ir para home</Link>)

        expect(
            screen.getByRole('link', { name: /ir para home/i })
        ).toBeInTheDocument()
    })

    it('deve propagar outras props para o componente RouterLink', () => {
        renderWithRouter(
            <Link href="/test" data-testid="test-link">
                Test Link
            </Link>
        )

        const link = screen.getByTestId('test-link')
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/test')
    })

    it('deve funcionar com className customizada', () => {
        renderWithRouter(
            <Link href="/test" className="custom-class">
                Custom Link
            </Link>
        )

        const link = screen.getByRole('link', { name: /custom link/i })
        expect(link).toHaveClass('custom-class')
    })

    it('deve manter href correto mesmo com paths diferentes', () => {
        renderWithRouter(<Link href="/auth/login">Login</Link>)

        const link = screen.getByRole('link', { name: /login/i })
        expect(link).toHaveAttribute('href', '/auth/login')
    })

    it('deve renderizar com href relativo', () => {
        renderWithRouter(<Link href="relative-path">Relative</Link>)

        const link = screen.getByRole('link', { name: /relative/i })
        expect(link).toBeInTheDocument()
    })
})
