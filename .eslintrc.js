module.exports = {
    extends: ['airbnb-base'],
    parserOptions: {
        ecmaVersion: 2018,
    },
    env: {
        es6: true,
        mocha: true,
    },
    rules: {
        'linebreak-style': ['error', 'windows'],
        'implicit-arrow-linebreak': ['off', 'beside'],
        indent: ['error', 4],
        'spaced-comment': [
            'error',
            'always',
            {
                exceptions: ['-', '+', 'jshint esversion:6'],
            },
        ],
    },
};
