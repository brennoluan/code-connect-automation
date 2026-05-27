import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Comment } from '../../../components/Comment'

// Mock do Avatar
vi.mock('../../../components/Avatar', () => ({
    Avatar: ({ author }) => (
        <div data-testid="avatar">
            {author.avatar && (
                <img src={author.avatar} alt={`Avatar do(a) ${author.name}`} />
            )}
        </div>
    ),
}))

describe('Comment', () => {
    const mockComment = {
        id: 1,
        text: 'Este é um comentário de teste',
        author: {
            id: 1,
            name: 'João Silva',
            username: 'joaosilva',
            avatar: 'https://example.com/avatar.jpg',
        },
    }

    it('deve renderizar o nome do autor', () => {
        render(<Comment comment={mockComment} />)

        expect(screen.getByText('@João Silva')).toBeInTheDocument()
    })

    it('deve renderizar o texto do comentário', () => {
        render(<Comment comment={mockComment} />)

        expect(
            screen.getByText('Este é um comentário de teste')
        ).toBeInTheDocument()
    })

    it('deve renderizar o avatar quando fornecido', () => {
        render(<Comment comment={mockComment} />)

        const avatar = screen.getByTestId('avatar')
        expect(avatar).toBeInTheDocument()

        const image = screen.getByAltText('Avatar do(a) João Silva')
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg')
    })

    it('deve funcionar sem avatar', () => {
        const commentWithoutAvatar = {
            ...mockComment,
            author: {
                ...mockComment.author,
                avatar: null,
            },
        }

        render(<Comment comment={commentWithoutAvatar} />)

        expect(screen.getByText('@João Silva')).toBeInTheDocument()
        expect(
            screen.getByText('Este é um comentário de teste')
        ).toBeInTheDocument()
        expect(screen.getByTestId('avatar')).toBeInTheDocument()
    })

    it('deve renderizar com autor diferente', () => {
        const differentComment = {
            ...mockComment,
            author: {
                id: 2,
                name: 'Maria Santos',
                username: 'mariasantos',
                avatar: 'https://example.com/maria.jpg',
            },
        }

        render(<Comment comment={differentComment} />)

        expect(screen.getByText('@Maria Santos')).toBeInTheDocument()
        const image = screen.getByAltText('Avatar do(a) Maria Santos')
        expect(image).toHaveAttribute('src', 'https://example.com/maria.jpg')
    })
})
