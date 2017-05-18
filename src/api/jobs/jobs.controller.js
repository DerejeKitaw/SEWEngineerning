const jobsRepo = require('../../../lib/jobsRepository'),
      util = require('util');

class JobsController {
    //  /api/jobs
    constructor(router) {
        router.get('/', this.getJobs.bind(this));
        router.get('/:id', this.getJob.bind(this));
        router.post('/', this.insertJob.bind(this));
        router.put('/:id', this.updateJob.bind(this));
    }

    getJobs(req, res) {
        console.log('*** getJobs');
        jobsRepo.getJobs((err, data) => {
            if (err) {
                console.log('*** getJobs error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getJobs ok');
                res.json(data.jobs);
            }
        });
    }

    getJob(req, res) {
        console.log('*** getJob');
        const id = req.params.id;
        jobsRepo.getJob(id, (err, customer) => {
            if (err) {
                console.log('*** getJob error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getJob ok');
                res.json(customer);
            }
        });

    }

    insertJob(req, res) {
        console.log('*** insertJob');
        statesRepo.getState(req.body.stateId, (err, state) => {
            if (err) {
                console.log('*** statesRepo.getState error: ' + util.inspect(err));
                res.json({ status: false, error: 'State not found', customer: null });
            } else {
                jobsRepo.insertJob(req.body, state, (err, customer) => {
                    if (err) {
                        console.log('*** jobsRepo.insertJob error: ' + util.inspect(err));
                        res.json({status: false, error: 'Insert failed', customer: null});
                    } else {
                        console.log('*** insertJob ok');
                        res.json({ status: true, error: null, customer: customer });
                    }
                });
            }
        });
    }

    updateJob(req, res) {
        console.log('*** updateJob');
        console.log('*** req.body');
        console.log(req.body);

        statesRepo.getState(req.body.stateId, (err, state) => {
            if (err) {
                console.log('*** statesRepo.getState error: ' + util.inspect(err));
                res.json({ status: false, error: 'State not found', customer: null });
            } else {
                jobsRepo.updateJob(req.params.id, req.body, state, (err, customer) => {
                    if (err) {
                        console.log('*** jobsRepo.updateJob error: ' + util.inspect(err));
                        res.json({status: false, error: 'Update failed', customer: null});
                    } else {
                        console.log('*** updateJob ok');
                        res.json({ status: true, error: null, customer: customer });
                    }
                });
            }
        });
    }
}

module.exports = JobsController;