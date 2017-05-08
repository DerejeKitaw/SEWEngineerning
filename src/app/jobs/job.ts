/**Defines the job entities */
export interface IJob {
    _id: number;
    FirstName: string;
    LastName: string;
    County: string;
    Address: string;
    CustomerEmail: string;
    CustomerPhone: string;
    Utility: string;
    SiteAssessDateReceived: string;
    SiteAssessDateReleased: string;
    EngineeringDesignReceived: string;
    EngineeringDesignSentToRep: string;
    EngineeringDesignApprovedByRep: string;
    EngineeringDesignReleased: string;
    NTPSubmited: string;
    NTPApproved: string;
    InterconnectionSubmited: string;
    InterconnectionApproved: string;
    PermitsSubmited: string;
    PermitsApproved: string;
    EquipmentOrdered: string;
    EquipmentOnHand: string;
    HOASubmited: string;
    HOAApproved: string;
    Notes: string;
    ScheduleDate: string;
    ModuleType: string;
    ModulePower: string;
    InverterManufacturer: string;
    InverterSize: string;
    Price: number;
    Type: string;
}
