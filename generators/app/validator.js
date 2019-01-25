/**
 *
 * @param {title} string
 */
module.exports.validateNonEmpty = function (title) {
    return title && title.length > 0;
}
/**
 *
 * @param {boolString} string
 */
module.exports.validateBool = function (boolString) {
    /** @type Boolean */
    var parsedValue;
    try {
        parsedValue = JSON.parse(boolString.trim().toLowerCase());
    }
    catch (error) {
        // Catch error, leaving parsedValue undefined but keeping execution running.
    }
    return typeof parsedValue === typeof true
}
/**
 *
 * @param {dateString} string
 */
module.exports.validatePublishDateString = function (dateString) {
    return dateString.match(/[0-1][0-9]\/[0-3][0-9]\/[0-9][0-9][0-9][0-9]/g).length === 1;
}
/**
 *
 * @param {intString} string
 */
module.exports.validateIntegerString = function (intString) {
    return intString.match(/^[0-9]+$/g).length === 1;
}