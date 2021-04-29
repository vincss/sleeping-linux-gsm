
import { dump, load } from 'js-yaml';
import { writeFileSync, readFileSync } from 'fs';
import { getLogger } from './logger';

const DefaultFavIcon = 'data:image/png;base64,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'
export const PORT_REPLACEMENT = '%SERVER_PORT%';
const SettingFilePath = 'settings.yml';

export type ServerInfo = {
    displayName: string;
    port: number;
    startCmd: string;
    stopCmd: string;
    workingDirectory: string;
}

export type SettingsInfo = {
    webPort: number;
    pageTitle: string;
    favIcon: string;
    statusCmd : string;
    servers: ServerInfo[],
}

const DefaultSettings: SettingsInfo = {
    webPort: 8080,
    pageTitle: 'Sleeping-Linux-GSM',
    favIcon: DefaultFavIcon,
    statusCmd: `lsof -i :${PORT_REPLACEMENT}`,
    servers: [{
        displayName: 'Valheim',
        port: 2456,
        startCmd: './vhserver start',
        stopCmd: './vhserver stop',
        workingDirectory: '/home/vhserver'
    }
    ]
}

const logger = getLogger();

export class Settings {

    static getSettings() {
        let settings = {...DefaultSettings}
        try {
            const read = readFileSync(SettingFilePath).toString();
            const settingsFromFiles = load(read) as Settings;
            settings = { ...DefaultSettings, ...settingsFromFiles };
        } catch (error) {
            logger.error('Failed to load setting, using default.', error.message);
            Settings.saveDefault();
        }    
        logger.info(`Retrieved settings:${JSON.stringify( {...settings, favIcon: '...'})}`);
        return settings;
    }

    static saveDefault() {
        try {
            const yamlToWrite = dump(DefaultSettings);
            writeFileSync(SettingFilePath, yamlToWrite)
        } catch (error) {
            logger.error('Failed to write setting.', error.message);
        }
    }
}