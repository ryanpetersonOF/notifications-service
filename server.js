const openfinLauncher = require('hadouken-js-adapter');
const express = require('express');
const os = require('os')
const app = express();
const path = require('path');
const http = require('http');

const appsConf  = path.resolve('./build/demo/app-launcher.json');

const port = process.env.port || 9048

app.use(express.static('./build'));

http.createServer(app).listen(port, async () => {
    console.log(`Server running on port: ${port}`);

    // on OS X we need to launch the provider manually (no RVM)
    if (os.platform() === 'darwin') {
        console.log("Starting Provider for Mac OS");
        const providerConf = path.resolve('./build/app.json');
        await openfinLauncher.launch({ manifestUrl: providerConf }).catch(err => console.log(err));
    }

    // launch the main demo apps launcher
    console.log('launching demo app');
    await openfinLauncher.launch({ manifestUrl: appsConf }).catch(err => console.log(err));

});
