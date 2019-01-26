/**
 *
 * @param {name} string
 */
module.exports.convertToId = function (name) {
    // 1. Strip out characters that probably shouldn't be in a filename.
    // 2. Make it lowercase.
    // 3. Replace spaces with hyphens.
    return name.replace(/[`~!@#$%^&*()_=+\[\]{}\\|;:"',.<>/?]/g, "").toLowerCase().replace(/ /g, '-');
}
