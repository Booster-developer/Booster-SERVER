const {PythonShell} = require('python-shell');


const getPage = async () => {
    let Page;
    console.log(1);
    await PythonShell.run('/Users/daeun/Desktop/Booster/Booster-SERVER/modules/getPDFPage.py', null,
                            function (err, result) {
        if (err) throw err;
        console.log(2);
        Page = result[0];
    });
    console.log(3);
    return Page;
}

console.log(getPage());

exports.module = getPage;



