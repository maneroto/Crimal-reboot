const AccessControl = require('accesscontrol');

// Initialize the access control helper
const ac = new AccessControl();

module.exports.roles = (() => {
    ac.grant('patient').readOwn('patient').updateOwn('patient');

    ac.grant('basic').readAny('user').updateOwn('user').readAny('patient');

    ac.grant('advanced')
        .extend('basic')
        .extend('patient')
        .createAny('patient')
        .updateAny('patient')
        .deleteAny('patient')
        .readAny('appointment');

    ac.grant('receptionist')
        .extend('advanced')
        .createAny('appointment')
        .updateAny('appointment')
        .deleteAny('appointment');

    ac.grant('nutritionist')
        .extend('advanced')
        .createAny('expedient_nutrition')
        .readAny('expedient_nutrition')
        .updateAny('expedient_nutrition')
        .deleteAny('expedient_nutrition');

    ac.grant('psychologist')
        .extend('advanced')
        .createAny('expedient_psychology')
        .readAny('expedient_psychology')
        .updateAny('expedient_psychology')
        .deleteAny('expedient_psychology');

    ac.grant('physiotherapist')
        .extend('advanced')
        .createAny('expedient_physiotherapy')
        .readAny('expedient_physiotherapy')
        .updateAny('expedient_physiotherapy')
        .deleteAny('expedient_physiotherapy');

    ac.grant('medic')
        .extend('advanced')
        .createAny('expedient_medical')
        .readAny('expedient_medical')
        .updateAny('expedient_medical')
        .deleteAny('expedient_medical');

    ac.grant('accountant')
        .extend('advanced')
        .createAny('expedient_treasury')
        .readAny('expedient_treasury')
        .updateAny('expedient_treasury')
        .deleteAny('expedient_treasury');

    ac.grant('admin')
        .extend('accountant')
        .extend('medic')
        .extend('physiotherapist')
        .extend('psychologist')
        .extend('nutritionist')
        .createAny('user')
        .updateAny('user')
        .deleteAny('user');

    return ac;
})();
