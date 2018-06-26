const fs = require('fs');
// reads auth0-variables.ts
var buf=fs.readFileSync('./src/app/auth/auth0-variables.ts');

// checks if isApp is set to true else throws an error stopping the whole build command
buf.toString().split(/\n/).forEach(function(line){
        if (line.includes('environment: Environment.Local,') || line.includes('environment: Environment.Hosted,')) {
            if (line.includes('environment: Environment.Hosted,')) {
                console.log('environment is set to Hosted.');
            } else {
                console.error('environment is not set to Hosted. Please do so in auth0-variables.ts.')
                throw(Error);
            }
        }
  });
