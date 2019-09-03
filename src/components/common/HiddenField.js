import React from 'react';
import { FieldConnect, ErrorField } from 'react-components-form';
 
const HiddenField = ({
    className,
    onChange,
    name,
    value,
    errorStyles = {},
    fieldAttributes = {}
}) => (
        <input
            type="hidden"
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            className={className}
        />
);
 
export default FieldConnect(HiddenField);