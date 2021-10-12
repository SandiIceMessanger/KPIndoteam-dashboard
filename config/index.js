const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV;
// console.log('Process Env', env)

const envPath = path.resolve(`.env.${env}`);
//console.log('Process EnvPath', envPath)

const defaultEnvPath = path.resolve('.env');
//console.log('Process DefaultEnvPath', defaultEnvPath)
// console.log(fs.existsSync(envPath))
require('dotenv').config({
    path: envPath,
});
