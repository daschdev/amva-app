const osc = require("osc");
import IUDPPort from "@Interfaces/osc/IUDPPort"
import IOSCMessage from "@Interfaces/osc/IOSCMessage";
import onMessage from "./osc/onMessage";

function createOSC(): IUDPPort {
    const oscServer = new osc.UDPPort({
        localAddress: process.env.OSC_SERVER_HOST || "127.0.0.1",
        localPort: Number(process.env.OSC_SERVER_PORT) || 57121,

        remoteAddress: process.env.OSC_CLIENT_HOST || "127.0.0.1",
        remotePort: Number(process.env.OSC_CLIENT_PORT) || 57120,
        metadata: true,
    }) as IUDPPort;

    oscServer.on("message", (msg: IOSCMessage) => onMessage(msg, oscServer));

    oscServer.open();

    return oscServer as IUDPPort;
}

export default createOSC;
