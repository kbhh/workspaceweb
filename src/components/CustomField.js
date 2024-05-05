import React from 'react'
import { Field, Control, Input, Help, Label } from 'bloomer';

/**
 * Custom bulma field
 * @param {error, placeholder, name, onChange, styles, required, type} props - 
 */
const CustomField = ({error, placeholder, name, value, onBlur, onChange, required, type, label}) => (
    <Field>
        {
            label ?
            <Label>{label}</Label>
            :null
        }
        <Control>
        <Input isColor={error ? 'danger' : ''} 
            type={type} placeholder={placeholder}
            name={name} value={value}
            onChange={onChange}
            required={required}
            onBlur={() => onBlur}
            />
        <Help isHidden={!error} isColor='danger'>{error}</Help>                        
        </Control>
    </Field>
)

export default CustomField