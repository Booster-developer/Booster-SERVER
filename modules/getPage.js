const {PythonShell} = require('python-shell');


const getPage = async () => {
    let Page;
    console.log(1);
    Page = await PythonShell.run('/Users/daeun/Desktop/Booster/Booster-SERVER/modules/getPDFPage.py', null,
                            function (err, result) {
        if (err) throw err;
        console.log(result[0])
        return result[0];
    });
    console.log(3);
    return Page;
}

const test = () => {
    return new Promise(function(resolve, reject) {
        PythonShell.run('/Users/daeun/Desktop/Booster/Booster-SERVER/modules/getPDFPage.py', null,
            function (err, result) {
                if (err) throw reject(err);
                resolve(result[0])
            });
    })
}

const temp2 = async () => {
    const data = await test()
    console.log('=========')
    console.log(data)
}

temp2()
exports.module = getPage;



