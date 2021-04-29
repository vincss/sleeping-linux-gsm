export enum ServerStatus {
    Sleeping = 'Sleeping',
    Online = 'Online',
    Starting = 'Starting',
    Stopping = 'Stopping'
}

export type ServerState = {
    displayName : string;
    detail: string;
    serverStatus: ServerStatus;
}