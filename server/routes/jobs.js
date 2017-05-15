var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://dereje:dereje@ds049466.mlab.com:49466/projectdb', ['projects']);

// Get All Projects
router.get('/jobs', function (req, res, next) {
    db.projects.find(function (err, jobs) {
        if (err) {
            res.send(err);
        }
        res.json(jobs);
    });
});

// Get Single Project
router.get('/job/:id', function(req, res, next){
    db.projects.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, job){
        if(err){
            res.send(err);
        }
        res.json(job);
    });
});

//Save Project
router.post('/job', function (req, res, next) {
    var job = req.body;
    if (!job.title || !(job.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.jobs.save(job, function (err, job) {
            if (err) {
                res.send(err);
            }
            res.json(job);
        });
    }
});

// Delete Project
router.delete('/job/:id', function (req, res, next) {
    db.jobs.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, job) {
        if (err) {
            res.send(err);
        }
        res.json(job);
    });
});

// Update Project
router.put('/job/:id', function (req, res, next) {
    var job = req.body;
    var upJob = {};
    if (job._id) {
        upJob.FirstName = job.FirstName
        upJob.LastName = job.LastName
        upJob.County = job.County
        upJob.Address = job.Address
        upJob.Utility = job.Utility
    }
    console.log("job : " + JSON.stringify(job));
    console.log("error saving job : ");
    db.projects.update({ _id: mongojs.ObjectId(req.params.id) }, upJob, {}, function (err, job) {
        if (err) {
            console.log("error saving job : " + err);
            res.send(err);
        }
        console.log("job Saved: " + req.params.id);
        res.json(job);
    });
});

module.exports = router;