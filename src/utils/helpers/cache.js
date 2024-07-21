import NodeCache from "node-cache";
const myCache = new NodeCache();


function addCache(key, value,ttl) {
    myCache.set(key, value, ttl);
}
function getCache(key) {
     return myCache.get(key);
}

export {addCache, getCache};