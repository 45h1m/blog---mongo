const rateMap = new Map();

export default function rateLimited(key:string, time:number) {

    if(key.toLocaleLowerCase().includes("ady.ashim@gmail.com")) return false;

    if(!rateMap.has(key)) {
        rateMap.set(key, {
            time,
            lastTime: Date.now()
        });

        return false;
    }

    const entry = rateMap.get(key);

    if(Date.now() - entry.lastTime > entry.time) {
        entry.lastTime = Date.now();
        return false;
    }

    return true;
}