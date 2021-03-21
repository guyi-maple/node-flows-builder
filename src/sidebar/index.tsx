import React, {CSSProperties, DragEvent} from "react";
import {Collapse} from "antd";
import {Runner} from "../data";

export interface SidebarProps {
    runners: Runner[];
}

const Sidebar = (props: SidebarProps) => {

    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string, runner: Runner) => {
        event.dataTransfer.setData("application/json", JSON.stringify(runner))
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const styles = {
        width: '80%',
        height: 40,
        border: 'solid 1px',
        borderRadius: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 16px'
    } as CSSProperties

    return (
        <Collapse  defaultActiveKey={['start']}>
            <Collapse.Panel key="start" header="入口节点">
                {
                    props.runners.filter(runner => runner.type === 'INPUT')
                        .map(runner => <div
                            draggable
                            onDragStart={e => onDragStart(e, 'input', runner)}
                            style={{...styles, borderColor: '#0041d0'}}
                        >{runner.name}</div>)
                }
            </Collapse.Panel>
            <Collapse.Panel key="mid" header="中间节点">
                {
                    props.runners.filter(runner => runner.type === 'MID')
                        .map(runner => <div
                            draggable
                            onDragStart={e => onDragStart(e, 'default', runner)}
                            style={{...styles, borderColor: '#222222'}}
                        >{runner.name}</div>)
                }
            </Collapse.Panel>
            <Collapse.Panel key="end" header="出口节点">
                {
                    props.runners.filter(runner => runner.type === 'OUTPUT')
                        .map(runner => <div
                            draggable
                            onDragStart={e => onDragStart(e, 'output', runner)}
                            style={{...styles, borderColor: '#FF0072'}}
                        >{runner.name}</div>)
                }
            </Collapse.Panel>
        </Collapse>
    );

};

export default Sidebar;