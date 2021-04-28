export enum ServerStatus {
    Sleeping = 'Sleeping',
    Online = 'Online',
}

export type ServerState = {
    displayName : string;
    detail: string;
    serverStatus: ServerStatus;
}