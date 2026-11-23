import styles from './Button.module.css'
import type {  ButtonHTMLAttributes } from 'react'

type VariantButton = 'primary' | 'secondary' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: VariantButton
    size?: ButtonSize
    isLoading?: boolean
    fullWidth?: boolean
}

export function Button ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    children,
    disabled,
    ...rest
}: ButtonProps) {
    const buttonClassNames = [
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
    ].filter(Boolean).join(' ')
    return (
        <button 
            className={buttonClassNames}
            disabled={disabled || isLoading}
            {...rest}>
            { isLoading ? 'Loading...' : children}

        </button>
    )

} 