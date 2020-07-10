const {PythonShell} = require('python-shell');

module.exports = () => {
        return new Promise(function(resolve, reject) {
        PythonShell.run('/Users/daeun/Desktop/Booster/Booster-SERVER/modules/getPDFPage.py', null,
            function (err, result) {
                if (err) {
                    console.log(err);
                    throw reject(err);
                }
                resolve(result[0])
            });
    })
}





