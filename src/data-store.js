const fs = require('fs');
const path = require('path');

const datastore = {};
const dataFolderPath = path.resolve(process.cwd(), 'data');

(function dataLoader() {
    fs.readdirSync(dataFolderPath).forEach(file => {
        const fileParts = file.split('.');
        if (fileParts.length > 1) {
            const extension = fileParts[fileParts.length - 1]
            const userID = fileParts[0];
            if (extension === 'json') datastore[userID] = require(dataFolderPath + '/' + file);
        }
    });
})();

module.exports = datastore;

