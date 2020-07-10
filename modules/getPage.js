const {PythonShell} = require('python-shell');

module.exports = (pdf) => {

    var options = {
        args: [pdf]
    }

    return new Promise(function(resolve, reject) {
        PythonShell.run('/Users/daeun/Desktop/Booster/Booster-SERVER/modules/getPDFPage.py', options,
            function (err, result) {
                if (err) {
                    console.log(err);
                    throw reject(err);
                }
                resolve(result[0])
            });
    })
}





