const JOBSTATUS={
    QUEUED: "QUEUED",
    RUNNING: "RUNNING",
    COMPLETED: "COMPLETED",
    PAUSED: "PAUSED",
    CANCELLED: "CANCELLED",
    FAILED: "FAILED"
};

const JOBTYPE={
    PROGRAM: "Program",
    EMAIL: "Email",
    ALARM: "Alarm"
};
const Enum={
    JOBSTATUS:JOBSTATUS,
    JOBTYPE: JOBTYPE
};

module.exports = Enum;