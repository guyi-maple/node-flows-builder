import React from "react";
import {Input, InputNumber} from "antd";
import MonacoEditor from 'react-monaco-editor';

export interface PropertyInputProps {
    type: string;
    value?: string;
    height?: string;
    onChange?: (e: any) => void;
}

export const INPUT = (props: PropertyInputProps) => <Input {...props} />

export const NUMBER = (props: PropertyInputProps) => <InputNumber {...props} style={{width: '100%'}} />

export const JAVASCRIPT = (props: PropertyInputProps) => <MonacoEditor
    width="100%"
    height={props.height || '400'}
    language="javascript"
    theme="vs-dark"
    value={props.value}
    options={{formatOnType: true, occurrencesHighlight: true}}
    onChange={value => {
        if (props.onChange){
            props.onChange({target: {value}})
        }
    }}
/>

const PropertyInput = (props: PropertyInputProps) => {

    if (props.type === 'INPUT') {
        return <INPUT {...props} />
    }

    if (props.type === 'NUMBER') {
        return <NUMBER {...props} />
    }

    if (props.type === 'JavaScript') {
        return <JAVASCRIPT {...props} />
    }

    return <div>不支持</div>;
}

export default PropertyInput;