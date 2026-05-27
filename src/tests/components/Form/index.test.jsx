import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form } from '../../../components/Form'
import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'

describe('Form', () => {
    it('deve renderizar um elemento form', () => {
        const { container } = render(
            <Form>
                <Input placeholder="Name" />
            </Form>
        )

        const form = container.querySelector('form')
        expect(form).toBeInTheDocument()
        expect(form.tagName).toBe('FORM')
    })

    it('deve chamar onSubmit quando o formulário é submetido', async () => {
        const handleSubmit = vi.fn((e) => e.preventDefault())
        const user = userEvent.setup()

        render(
            <Form onSubmit={handleSubmit}>
                <Input name="email" placeholder="Email" />
                <Button type="submit">Submit</Button>
            </Form>
        )

        const submitButton = screen.getByRole('button', { name: /submit/i })
        await user.click(submitButton)

        expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it('deve propagar outras props para o elemento form', () => {
        render(
            <Form action="/submit" method="post" data-testid="test-form">
                <Input name="test" />
            </Form>
        )

        const form = screen.getByTestId('test-form')
        expect(form).toHaveAttribute('action', '/submit')
        expect(form).toHaveAttribute('method', 'post')
    })

    it('deve renderizar children corretamente', () => {
        render(
            <Form>
                <Input placeholder="Email" />
                <Input placeholder="Password" />
                <Button>Submit</Button>
            </Form>
        )

        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: /submit/i })
        ).toBeInTheDocument()
    })

    it('deve incluir valores dos campos no evento submit', async () => {
        const handleSubmit = vi.fn((e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            expect(formData.get('email')).toBe('test@example.com')
            expect(formData.get('password')).toBe('password123')
        })
        const user = userEvent.setup()

        render(
            <Form onSubmit={handleSubmit}>
                <Input name="email" defaultValue="test@example.com" />
                <Input
                    name="password"
                    type="password"
                    defaultValue="password123"
                />
                <Button type="submit">Submit</Button>
            </Form>
        )

        const submitButton = screen.getByRole('button', { name: /submit/i })
        await user.click(submitButton)

        expect(handleSubmit).toHaveBeenCalledTimes(1)
    })
})
