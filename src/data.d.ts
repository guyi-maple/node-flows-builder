
export interface Runner {
    type: string;
    name: string;
    classes: string;
    properties: RunnerProperty[];
}

export interface RunnerProperty {
    key: string;
    type: string;
    detail: string;
}