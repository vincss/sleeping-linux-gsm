import express, { Express } from 'express';
import exphbs from 'express-handlebars';
import * as http from 'http';
import { execSync } from 'child_process';
import path from 'path';

import { SettingsInfo } from './settings';
import { getLogger, LoggerType } from './logger';


export class Web {
    settings: SettingsInfo;
    app: Express;
    server?: http.Server;
    logger: LoggerType;

    constructor(settings: SettingsInfo){
        this.settings = settings;
        this.logger = getLogger();
        this.app = express();
    }

    init() {
        this.app.engine('hbs', exphbs({
            defaultLayout: 'main',
            layoutsDir: path.join(__dirname, './views/layouts/'),
            extname: '.hbs',
            helpers: {
              title: () => { return this.settings.pageTitle },
              favIcon: () => { return this.settings.favIcon },
            }
          }));
      
          this.app.set('view engine', 'hbs');
          this.app.use(express.static(path.join(__dirname, './views')));
      
          this.app.get('/', (req, res) => {
            res.render(path.join(__dirname, './views/home'), { });
            // res.render('./src/views/home', { });
          });
      
          this.app.post('/wakeup', (req, res) => {
            // this.playerConnectionCallBack();
            res.send('received');
          })
      
          this.app.get('/status', async (req, res) => {
            // const status = await this.sleepingContainer.getStatus()
            res.json(status);
          });
      
          this.server = this.app.listen(this.settings.webPort, () => {
            this.logger.info(`Starting web server on *:${this.settings.webPort}`);
          })
    }

    close() {
        this.server?.close;
    }
/* 


const app = express();
const port = 4103; // default port to listen

app.set('views', 'views');
app.set('view engine', 'pug');

const detail = {}

const getServerStatus = () => {
    let status = { status: 'offline', detail: '' };
    try {
        const detail = execSync('lsof -i :4104').toString();
        status.status = 'online';
        status.detail = detail
    } catch (error) {

    }
    return status;
}

app.get("/", (req, res) => {
    res.render('index.pug', { title: 'ValZur Status', serverStatus: getServerStatus() })
});

app.get('/wakeup', (req, res) => {
    let log = 'EmptyLog';
    try{
        log = execSync('./vhserver start', { cwd: '/home/vhserver' }).toString();
    }catch(error) {
        log = error.message;
    }    
    res.send(log);
});
app.get('/sleep', (req, res) => {
    let log = 'EmptyLog';
    try{
        log = execSync('./vhserver stop', { cwd: '/home/vhserver' }).toString();
    }catch(error) {
        log = error.message;
    }    
    res.send(log);
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
 */
}