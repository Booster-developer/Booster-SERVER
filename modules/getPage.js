const {pythonShell} = require('python-shell');


const getPage = async () => {
    await pythonShell.run('/Users/daeun/Desktop/Booster/Booster-SERVER/modules/getPDFPage.py', null, function (err, result) {
        if (err) throw err;
        console.log(result[0]);
    });
}


module.exports = getPage;



