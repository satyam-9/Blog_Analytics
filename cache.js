const _ = require("lodash");

const cacheOptions = {
    maxAge: 60000, //60 seconds
};

const cache = new Map();

const asyncMemoize =
    (func) =>
    async (...args) => {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = await func(...args);
        cache.set(key, result);

        setTimeout(() => cache.delete(key), cacheOptions.maxAge);

        return result;
    };

module.exports = asyncMemoize;
