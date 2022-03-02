module.exports = function() {
    const [,, operation, ...args] = process.argv;

    return {
        operation,
        args
    }
}