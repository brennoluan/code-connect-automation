import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { CardPost } from '../../../components/CardPost'
import { renderWithRouter } from '../../utils'

// Mock do Author
vi.mock('../../../components/Author', () => ({
    Author: ({ author }) => <div data-testid="author">@{author.name}</div>,
}))

// Mock do ThumbsUpButton
vi.mock('../../../components/CardPost/ThumbsUpButton', () => ({
    ThumbsUpButton: () => <button data-testid="thumbs-up-button">👍</button>,
}))

// Mock do IconButton
vi.mock('../../../components/IconButton', () => ({
    IconButton: ({ children, ...props }) => (
        <button {...props}>{children}</button>
    ),
}))

// Mock do IconChat
vi.mock('../../../components/icons/IconChat', () => ({
    IconChat: () => <svg data-testid="chat-icon" />,
}))

describe('CardPost', () => {
    const mockPost = {
        id: 1,
        title: 'Título do Post',
        body: 'Este é o conteúdo do post de teste',
        slug: 'titulo-do-post',
        cover: 'https://example.com/cover.jpg',
        likes: 42,
        comments: [
            { id: 1, text: 'Comentário 1', author: { name: 'João' } },
            { id: 2, text: 'Comentário 2', author: { name: 'Maria' } },
        ],
        author: {
            id: 1,
            name: 'Ana Paula',
            username: 'anapaula_dev',
            avatar: 'https://example.com/avatar.jpg',
        },
    }

    it('deve renderizar o título do post', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        expect(
            screen.getByRole('heading', { name: /título do post/i })
        ).toBeInTheDocument()
    })

    it('deve renderizar o corpo do post', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        expect(
            screen.getByText('Este é o conteúdo do post de teste')
        ).toBeInTheDocument()
    })

    it('deve renderizar a imagem de capa com alt correto', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        const image = screen.getByAltText(
            'Capa do post de titulo: Título do Post'
        )
        expect(image).toBeInTheDocument()
        expect(image).toHaveAttribute('src', 'https://example.com/cover.jpg')
    })

    it('deve renderizar o número de likes', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        expect(screen.getByText('42')).toBeInTheDocument()
    })

    it('deve renderizar o número de comentários', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        expect(screen.getByText('2')).toBeInTheDocument()
    })

    it('deve renderizar o link para o post com slug correto', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        const link = screen.getByRole('link', { name: /ver detalhes/i })
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/blog-post/titulo-do-post')
    })

    it('deve renderizar o componente Author', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        expect(screen.getByTestId('author')).toBeInTheDocument()
        expect(screen.getByText('@Ana Paula')).toBeInTheDocument()
    })

    it('deve renderizar o botão de like', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        expect(screen.getByTestId('thumbs-up-button')).toBeInTheDocument()
    })

    it('deve renderizar o botão de comentário', () => {
        renderWithRouter(<CardPost post={mockPost} />)

        expect(screen.getByTestId('chat-icon')).toBeInTheDocument()
    })

    it('deve funcionar com post sem comentários', () => {
        const postWithoutComments = {
            ...mockPost,
            comments: [],
        }

        renderWithRouter(<CardPost post={postWithoutComments} />)

        expect(screen.getByText('0')).toBeInTheDocument()
    })

    it('deve funcionar com likes zero', () => {
        const postWithZeroLikes = {
            ...mockPost,
            likes: 0,
        }

        renderWithRouter(<CardPost post={postWithZeroLikes} />)

        expect(screen.getByText('0')).toBeInTheDocument()
    })
})
