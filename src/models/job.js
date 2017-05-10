const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const JobSchema = new Schema({
    _id: { type : number, required: true, trim: true },
    FirstName: { type : String, required: true, trim: true },
    LastName: { type : String, required: false, trim: true },
    County: { type : String, required: false, trim: true },
    Address: { type : String, required: false, trim: true },
    CustomerEmail: { type : String, required: false, trim: true },
    CustomerPhone: { type : String, required: false, trim: true },
    Utility: { type : String, required: false, trim: true },
    SiteAssessDateReceived: { type : String, required: false, trim: true },
    SiteAssessDateReleased: { type : String, required: false, trim: true },
    EngineeringDesignReceived: { type : String, required: false, trim: true },
    EngineeringDesignSentToRep: { type : String, required: false, trim: true },
    EngineeringDesignApprovedByRep: { type : String, required: false, trim: true },
    EngineeringDesignReleased: { type : String, required: false, trim: true },
    NTPSubmited: { type : String, required: false, trim: true },
    NTPApproved: { type : String, required: false, trim: true },
    InterconnectionSubmited: { type : String, required: false, trim: true },
    InterconnectionApproved: { type : String, required: false, trim: true },
    PermitsSubmited: { type : String, required: false, trim: true },
    PermitsApproved: { type : String, required: false, trim: true },
    EquipmentOrdered: { type : String, required: false, trim: true },
    EquipmentOnHand: { type : String, required: false, trim: true },
    HOASubmited: { type : String, required: false, trim: true },
    HOAApproved: { type : String, required: false, trim: true },
    Notes: { type : String, required: false, trim: true },
    ScheduleDate: { type : String, required: false, trim: true },
    ModuleType: { type : String, required: false, trim: true },
    ModulePower: { type : String, required: false, trim: true },
    InverterManufacturer: { type : String, required: false, trim: true },
    InverterSize: { type : String, required: false, trim: true },
    Price: { type : number, required: false, trim: true },
    Type: { type : String, required: false, trim: true }
});

module.exports = mongoose.model('Job', JobSchema, 'jobs');
