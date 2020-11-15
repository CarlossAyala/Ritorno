const {format} = require('timeago.js');

const helpers = {};

helpers.timeAgo = date => format(date);

module.exports = helpers;

