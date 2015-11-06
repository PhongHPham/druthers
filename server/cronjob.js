// Dependencies
var CronJob = require('cron').CronJob;
var createCandidates = require("./createCandidates");

// cronjob.js:
exports.start = function () {
  return;
    var job = new CronJob('00 30 11 * * *', function() {
  // var job = new CronJob('00 * * * * *', function() {
			// return console.log(42, new Date());
					createCandidates.populateDb(function (error, result) {
						if (error) {
									if (Array.isArray(error)) {
										error.forEach(function (cErr) {
												console.log(cErr);
										})
									} else {
										console.log(error);
									}
							} else {
								console.log(result);
							}
					});
    },
    true,
    "America/Los_Angeles"
  );
  return job;
};
