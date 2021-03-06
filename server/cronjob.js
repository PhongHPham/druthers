// Dependencies
var CronJob = require('cron').CronJob;
var createCandidates = require("./createCandidates");

// cronjob.js:
exports.start = function () {
  var job = new CronJob('30 11 1 * *', function() {
		createCandidates.populateDb(function (error, result) {
			if (error) {
				if (Array.isArray(error)) {
					error.forEach(function (cErr) {
						console.log(cErr);
					});
				} else {
					console.log(error);
				}
			} else {
				console.log(result);
			}
		});
  }, true, "America/Los_Angeles");
  return job;
};
