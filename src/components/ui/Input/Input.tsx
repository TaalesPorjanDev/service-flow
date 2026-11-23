import { useId } from 'react';
import type { InputHTMLAttributes} from 'react';
import styles from './Input.module.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Input({ label,error,helperText, ...rest}: InputProps) {
    const generatedId = useId();
    const inputId = rest.id || generatedId;
    const InputClassNames = [
        styles.input,
        error && styles.inputError
    ].filter(Boolean).join(' ');

    return (
        <div className={styles.container}> 
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                </label>
            )}
            <input id={inputId} className={InputClassNames} {...rest}/>
            {error ? (
                <p className={styles.errorMessage}>{error}</p>
            ) : helperText ? (
                <p className={styles.helperText}>{helperText}</p>
            ) : null}
        </div>
)
} 