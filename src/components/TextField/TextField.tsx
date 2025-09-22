import React, { ChangeEvent } from 'react';

type TextFieldProps = {
    label: string;
    value: string;
    name: string;
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isTextArea?: boolean;
    isRequired?: boolean;
};

const TextField: React.FC<TextFieldProps> = ({ label, value, name, onChange, isTextArea = false, isRequired = false }) => {
    return (
        <div className="mb-4">
            <label className="block text-base-content text-sm font-bold mb-2">{ label }</label>
            { isTextArea ? (
                <textarea
                    className="shadow-sm border-2 border-base-300 appearance-none rounded w-full py-2 px-3 text-base-content leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
                    defaultValue={ value }
                    name={ name }
                    onChange={ onChange }
                    required={ isRequired }
                />
            ) : (
                <input
                        className="shadow-sm border-2 border-base-300 appearance-none rounded w-full py-2 px-3 text-base-content leading-tight focus:outline-none focus:shadow-outline focus:border-primary"
                    type="text"
                    defaultValue={ value }
                    name={ name }
                    onChange={ onChange }
                    required={ isRequired }
                />
            ) }
        </div>
    );
};

export default TextField;
