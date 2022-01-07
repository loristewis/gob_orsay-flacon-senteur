import EventEmitter from "events";

const ee = new EventEmitter();
ee.setMaxListeners(0);

export default ee;
