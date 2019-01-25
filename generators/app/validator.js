/**
 *
 * @param {title} string
 */
module.exports.validateNonEmpty = function(title) {
    return title && title.length > 0;
}
/**
 *
 * @param {dateString} string
 */
module.exports.validatePublishDateString = function(dateString) {
    return dateString.match(/[0-1][0-9]\/[0-3][0-9]\/[0-9][0-9][0-9][0-9]/g).length === 1;
}