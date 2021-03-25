import express = require('express');
import { execSync } from 'child_process';

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