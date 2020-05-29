const {Counter} = require('./models/counter');
const mongoose = require('mongoose');

async function saveCounterDoc() {
    try {
        const cnt = new Counter({});
        await cnt.save();

    } catch (error) {
        console.log('Something failed (Counter DOC)')
    }
};
async function getNextCounter() {
    let val = 0;
    const v = await Counter.findByIdAndUpdate("urlID", {
        $inc : {
            currentCnt: 1,
        },
        new: true
    }, {useFindAndModify: false});

    if(!v) {
        saveCounterDoc();
    }
    else val = v.currentCnt;
    return val;
};

module.exports.getNextCounter = getNextCounter;
