const mongoose = require('mongoose');

const oLeaves = mongoose.Schema({
    // sName: { type: String },
    nDate: { type: Date, default: Date.now },
    sReason: { type: String },
    bIsFullDay: { type: Boolean },
    bIsLeaveTypeCL: { type: Boolean },
    oUser: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth' }
})

module.exports = mongoose.model('oLeavesData', oLeaves);