import React, {
    useRef,
    useState,
    DragEvent,
    MouseEvent
} from "react";
import ReactFlow, {
    addEdge,
    updateEdge,
    removeElements,
    FlowElement,
    OnLoadParams, Edge, Connection
} from 'react-flow-renderer';
import {notification} from 'antd';
import {Runner} from "../data";

import styles from './index.style';

const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

export interface NodeFlowsEditorProps {
    current: FlowElement;
    elements: FlowElement[];
    onCurrent?: (element: FlowElement | null) => void;
    onCreateNode?: (element: FlowElement) => FlowElement;
    onCreateEdge?: (edge: Edge) => Edge;
    onElementsUpdate: (elements: FlowElement[]) => void;
}

const NodeFlowsEditor = (props: NodeFlowsEditorProps) => {
    const wrapper = useRef(null);

    const [flowInstance, setFlowInstance] = useState({} as OnLoadParams);

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        // @ts-ignore
        const reactFlowBounds = wrapper.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');
        const position = flowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        });

        const runner = JSON.parse(event.dataTransfer.getData('application/json')) as Runner;
        if (runner.type === 'INPUT' && props.elements.filter(e => e.data.type === 'INPUT').length > 0) {
            notification.error({
                message: '入口节点最多一个'
            })
            return;
        }

        const element = {
            id: `random-${Math.random()}`,
            type,
            position,
            data: {...runner, label: runner.name, node: true},
        };

        props.onElementsUpdate(props.elements.concat(element));
    };

    const onConnect = (conn: Edge | Connection) => {
        const edge = {
            ...conn,
            id: `random-${Math.random()}`,
            data: {condition: 'true'},
            arrowHeadType: 'arrowclosed'
        } as Edge;

        if (props.onCreateEdge){
            props.onElementsUpdate(addEdge(props.onCreateEdge(edge), props.elements));
        }else {
            props.onElementsUpdate(addEdge(edge, props.elements));
        }
    };

    const onElementClick = (event: MouseEvent, element: FlowElement) => {
        if (props.onCurrent) {
            props.onCurrent(element);
        }
    }

    const onElementsRemove = (es: FlowElement[]) => {
        props.onElementsUpdate(removeElements(es, props.elements));
        if (props.onCurrent) {
            props.onCurrent(null);
        }
    }

    return <div ref={wrapper} style={styles.wrapper}>
        <ReactFlow
            minZoom={1}
            maxZoom={2}
            onDrop={onDrop}
            onConnect={onConnect}
            onDragOver={onDragOver}
            elements={props.elements}
            onElementClick={onElementClick}
            onElementsRemove={onElementsRemove}
            onLoad={instance => setFlowInstance(instance)}
            onEdgeUpdate={(edge, conn) => props.onElementsUpdate(updateEdge(edge, conn, props.elements))}
        />
    </div>;
}

export default NodeFlowsEditor;