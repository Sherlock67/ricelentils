const { queryOperationService } = require('../services');
const commandPerser = require('./command-parser');
const outputResult = require('./output-result');

module.exports = function main() {
    const { operation, args } = commandPerser();
    
    const result = queryOperationService.executeQueryOperations(operation, args);

    outputResult(result);
}

