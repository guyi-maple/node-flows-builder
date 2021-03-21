import React, {useEffect, useState} from "react";
import {Col, Row} from "antd";
import {Runner} from "../src/data";
import {FlowElement} from "react-flow-renderer";
import NodeFlowsEditor from "../src/editor";
import Sidebar from "../src/sidebar";
import axios from "axios";
import ElementDetail from "../src/detail";

const Main = () => {

    const [elements, setElements] = useState([] as FlowElement[]);
    const [runners, setRunners] = useState([] as Runner[]);
    const [current, setCurrent] = useState({} as FlowElement);

    const fetch = () => {
        axios.get('http://localhost:8080/runner')
            .then(resp => setRunners(resp.data.data))
    }

    useEffect(() => fetch(), [])

    return <Row style={{height: '100%'}}>
        <Col span={4} style={{height: '100%'}}>
            <Sidebar runners={runners} />
        </Col>
        <Col span={16} style={{height: '100%'}}>
            <NodeFlowsEditor
                elements={elements}
                current={current}
                onElementsUpdate={setElements}
                onCurrent={c => {
                    if (c){
                        setCurrent(c)
                    }
                }}
             />
        </Col>
        <Col span={4} style={{height: '100%'}}>
            <ElementDetail element={current} onUpdate={e => {}} />
        </Col>
    </Row>
}

export default Main;