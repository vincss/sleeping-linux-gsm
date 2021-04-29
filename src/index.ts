import { getLogger } from './logger';
import { version } from '../package.json';
import { Web } from './web';
import { Settings, SettingsInfo } from './settings';

const logger = getLogger();

function setupFallBacks() {
    process.on('SIGINT', async () => {
        logger.info('SIGINT signal received.');
        main.close();
        process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
        logger.info('SIGTERM  signal received.');
        main.close();
        process.exit(0);
    });
    
    process.on('uncaughtException', function (err: any) {
        logger.warn(`Caught uncaughtException: ${JSON.stringify(err)}`);
    
        if (err.code === 'ECONNRESET') {
            logger.info('Connection reset client side... Keep on going.');
            return;
        }
        if (err.code === 'EADDRINUSE') {
            logger.info(`A server is already using the port . Kill it and restart the app.`)
        }
        if (err.message !== 'undefined'
            // && err.message.indexOf('handshaking.toServer')
        ) {
            logger.error('Something bad happened', err.message);
        }
    
        main.close();
        logger.info('...Exiting...');
        process.exit(1);
    });
}

class Main {

    web : Web;
    settings : SettingsInfo;

    constructor() {
        
        const msg = `... A new story begin v${version} ...`;
        const separator = msg.replace(/./g,'.');
        logger.info(separator);
        logger.info(msg);
        logger.info(separator)
        this.settings= Settings.getSettings();
        this.web = new Web(this.settings);
    }
    
    init(){
        this.web.init();
    }

    close() {
        logger.info('... End of the story ! ...')
        this.web.close();
    }
}


setupFallBacks();
const main = new Main();
main.init();