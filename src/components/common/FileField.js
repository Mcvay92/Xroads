import React from 'react';
import { FieldConnect, ErrorField } from 'react-components-form';
 import {Add} from '@material-ui/icons';
const FileField = ({
    wrapperClassName,
    className,
    onChange,
    name,
    errors,
    error,
    value,
    imgSrc,
    label,
    placeholder,
    errorStyles = {},
    fieldAttributes = {}
}) => (
    <div className={wrapperClassName}>
        {label && <label>{label}</label>}
        <input
            type="file"
            name={name}
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder={placeholder}
            className={className}
        />
        {imgSrc &&
        <span className="img-layer">   
            <img src={imgSrc} className="fileImg"/>
            <Add/>
        </span>}
        {error && <ErrorField errors={errors} {...errorStyles} />}
    </div>
);
 
export default FieldConnect(FileField);