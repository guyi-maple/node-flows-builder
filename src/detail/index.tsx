import React, {useEffect} from "react";
import {Button, Form, Input, Card} from "antd";
import PropertyInput, {JAVASCRIPT} from "./input";
import {FlowElement} from "react-flow-renderer";

export interface DetailDataSource {
    id?: string;
    label?: string;
    data?: {
        label: string;
        name: string;
        node?: boolean;
        properties: {
            key: string;
            detail: string;
            type: string;
        }[]
    }
}

export interface DetailProps {
    element: DetailDataSource | null;
    onUpdate: (source: FlowElement | null) => void;
}

const ElementDetail = (props: DetailProps) => {

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({name: ''})
        form.setFieldsValue(props.element?.data);
    }, [props.element])

    const onSave = () => {
        form.validateFields().then(values => {
            const element = {...props.element, label: props.element?.data?.node ? undefined : values.name} as FlowElement;
            element.data = {...element.data, ...values, label: values.name};
            props.onUpdate(element);
        })
    }

    if (!props.element || !props.element.id){
        return null;
    }

    return <Card
        bordered={false}
        title={`${props.element.data?.node ? '节点':'连接'}信息`}
    >
        <Form form={form} layout="vertical">
            <Form.Item label="名称" name="name">
                <Input />
            </Form.Item>
            {
                !props.element.data?.node ?
                    <Form.Item label="条件" name="condition">
                        <JAVASCRIPT type="JavaScript" height="100" />
                    </Form.Item> : null
            }
            {
                (props.element.data?.properties || []).map(property =>
                    <Form.Item
                        label={property.detail}
                        name={property.key}
                    >
                        <PropertyInput type={property.type} />
                    </Form.Item>)
            }
            <Form.Item>
                <Button block style={{marginTop: 16}} onClick={onSave}>保存信息</Button>
            </Form.Item>
        </Form>
    </Card>
}

export default ElementDetail;