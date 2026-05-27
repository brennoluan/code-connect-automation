import { useRef, useEffect } from 'react'
import styles from './form.module.css'

export const Form = ({ children, action, onSubmit, ...props }) => {
    const formRef = useRef(null)

    useEffect(() => {
        const form = formRef.current
        if (!form) return

        // Só intercepta submit se action for uma função ou se onSubmit existir
        if (typeof action === 'function' || onSubmit) {
            const handleSubmit = (e) => {
                e.preventDefault()

                if (action && typeof action === 'function') {
                    const formData = new FormData(form)
                    action(formData)
                } else if (onSubmit) {
                    onSubmit(e)
                }
            }

            form.addEventListener('submit', handleSubmit)

            return () => {
                form.removeEventListener('submit', handleSubmit)
            }
        }
    }, [action, onSubmit])

    // Se action for uma função ou onSubmit existir, não passa onSubmit para o elemento form
    // para evitar chamada dupla
    const shouldIntercept = typeof action === 'function' || onSubmit
    const formProps = shouldIntercept
        ? {
              ...props,
              action: typeof action === 'function' ? undefined : action,
              onSubmit: undefined,
          }
        : { ...props, action, onSubmit }

    return (
        <form ref={formRef} className={styles.form} {...formProps}>
            {children}
        </form>
    )
}
