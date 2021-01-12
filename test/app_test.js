const { assert } = require('chai');

describe('CRIMAL app testing', () => {
    describe('Check that mocka and chai are up and running', () => {
        it('Check if "hello" is a string', () => {
            const result = 'hello';
            assert.typeOf(result, 'string');
        });
    });
});
