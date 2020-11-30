'use strict';

const config = require('config');
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient(
    config.has('redis') ? config.get('redis') : {}
);

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on('error', function (err) {
    console.error('[REDIS]', err);
});

module.exports.set = async function (key, value, expire = null) {
    if (value === Object(value)) {
        value = JSON.stringify(value);
    }
    const resp = await client.set(key, value, redis.print);
    if (resp && expire) {
        this.expire(key, expire);
    }
    return await resp;
};

module.exports.get = async function (key) {
    if (!key) {
        return null;
    }
    let resp = null;
    try {
        if (key.indexOf('*') !== -1) {
            resp = [];
            const keys = await client.multi().keys(key).execAsync();
            for (let k = 0; k < keys.length; k++) {
                for (let i = 0; i < keys[k].length; i++) {
                    const getData = await this.get(keys[k][i]);
                    if (await getData) {
                        getData.key = keys[k][i].substr(keys[k][i].lastIndexOf(':') + 1);
                        await resp.push(await getData);
                    }
                }
            }
            resp = (await resp).sort((a, b) =>
                new Date(a.time) > new Date(b.time) ? -1 : new Date(a.time) < new Date(b.time) ? 1 : 0);
        } else {
            resp = await client.getAsync(key);
            resp = JSON.parse(resp);
        }
    } catch (e) {
        console.error('[REDIS]', e.message);
    }
    return await resp;
};

module.exports.keys = async function (key) {
    if (!key) {
        return null;
    }
    const resp = [];
    try {
        const keys = await client.multi().keys(key).execAsync();
        for (let k = 0; k < keys.length; k++) {
            for (let i = 0; i < keys[k].length; i++) {
                await resp.push(keys[k][i].substr(keys[k][i].lastIndexOf(':') + 1));
            }
        }
    } catch (e) {
        console.log('[REDIS]', e.message);
    }
    return await resp;
};

module.exports.remove = async function (key, keyIgnore = null) {
    if (!key) {
        return null;
    }
    try {
        if (key.indexOf('*') !== -1) {
            const resp = {};
            const keys = await client.multi().keys(key).execAsync();
            for (let k = 0; k < keys.length; k++) {
                for (let i = 0; i < keys[k].length; i++) {
                    if (keyIgnore !== keys[k][i].substr(keys[k][i].lastIndexOf(':') + 1)) {
                        resp[`${keys[k][i].substr(keys[k][i].lastIndexOf(':') + 1)}`] = await client.del(keys[k][i]);
                    }
                }
            }
            return await resp;
        }
        return await client.del(key);
    } catch (e) {
        console.log('[REDIS]', e.message);
    }
    return false;
};

module.exports.expire = async function (key, value) {
    return await client.expire(key, value);
};
