const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      Job = require('../models/job');

class JobsRepository {

    // get all the jobs
    getJobs(callback) {
        console.log('*** JobsRepository.getJobs');
        Job.count((err, custsCount) => {
            var count = custsCount;
            console.log(`Jobs count: ${count}`);

            Job.find({}, (err, jobs) => {
                if (err) { 
                    console.log(`*** JobsRepository.getJobs error: ${err}`); 
                    return callback(err); 
                }
                callback(null, {
                    count: count,
                    jobs: jobs
                });
            });

        });
    }


    // get a  job
    getJob(id, callback) {
        console.log('*** JobsRepository.getJob');
        Job.findById(id, (err, job) => {
            if (err) { 
                console.log(`*** JobsRepository.getJob error: ${err}`); 
                return callback(err); 
            }
            callback(null, job);
        });
    }

    // insert a  job
    insertJob(body, state, callback) {
        console.log('*** JobsRepository.insertJob');
        console.log(state);
        var job = new Job();
        var newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
        console.log(body);

        job.firstName = body.firstName;
        job.lastName = body.lastName;
        job.email = body.email;
        job.address = body.address;
        job.city = body.city;
        job.state = newState;
        job.stateId = newState.id;
        job.zip = body.zip;
        job.gender = body.gender;

        job.save((err, job) => {
            if (err) { 
                console.log(`*** JobsRepository insertJob error: ${err}`); 
                return callback(err, null); 
            }

            callback(null, job);
        });
    }

    updateJob(id, body, state, callback) {
        console.log('*** JobsRepository.editJob');

        var state = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }

        Job.findById(id, (err, job)  => {
            if (err) { 
                console.log(`*** JobsRepository.editJob error: ${err}`); 
                return callback(err); 
            }

            job.firstName = body.firstName || job.firstName;
            job.lastName = body.lastName || job.lastName;
            job.email = body.email || job.email;
            job.address = body.address || job.address;
            job.city = body.city || job.city;
            job.state = state;
            job.stateId = state.id;
            job.zip = body.zip || job.zip;
            job.gender = body.gender || job.gender;


            job.save((err, job) => {
                if (err) { 
                    console.log(`*** JobsRepository.updateJob error: ${err}`); 
                    return callback(err, null); 
                }

                callback(null, job);
            });

        });
    }

    // delete a job
    deleteJob(id, callback) {
        console.log('*** JobsRepository.deleteJob');
        Job.remove({ '_id': id }, (err, job) => {
            if (err) { 
                console.log(`*** JobsRepository.deleteJob error: ${err}`); 
                return callback(err, null); 
            }
            callback(null, job);
        });
    }

}

module.exports = new JobsRepository();