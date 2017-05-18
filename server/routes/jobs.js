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
router.get('/job/:id', function (req, res, next) {
    db.projects.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, job) {
        if (err) {
            res.send(err);
        }
        res.json(job);
    });
});

//Save Project
router.post('/job', function (req, res, next) {
    var job = req.body;
    if (!job.FirstName || !(job.LastName + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        console.log('***Saving Data from post***');
        db.projects.save(job, function (err, job) {
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
    console.log('***Saving Data from put***');
    var job = req.body;
    var jobForm = {};
// TODO: Validate data
    if (job.FirstName) {
        jobForm.FirstName = job.FirstName;
    }
    if (job.LastName) {
        jobForm.LastName = job.LastName;
    }
    jobForm.County = job.County
    jobForm.Address = job.Address
    jobForm.Utility = job.Utility

    if (!jobForm) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.projects.update({ _id: mongojs.ObjectId(req.params.id) }, jobForm, {}, function (err, job) {
            if (err) {
                res.send(err);
            }
            res.json(job);
        });
    }
});

module.exports = router;