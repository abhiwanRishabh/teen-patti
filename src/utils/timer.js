const wait = (time = 1000, cb) => {
    setTimeout(() => {
        cb();
    }, time);
};

export default wait;
