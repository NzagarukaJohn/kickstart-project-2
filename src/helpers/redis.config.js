import { createClient } from 'redis';
import { config } from 'dotenv';
config();

const redisClient = createClient({
    password: process.env.REDIS_PWD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    }
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Redis Client connected'));
(async () => {
  await redisClient.connect();
})();

export const setToken = async (key, value) => await redisClient.set(key, value);
export const deleteToken = async (key) => await redisClient.del(key);
export const getToken = async (key) => await redisClient.get(key);

export default redisClient;
