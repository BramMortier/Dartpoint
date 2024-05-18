// =============================================================================
// Initialize Pusher
// =============================================================================
import Pusher = require("pusher");

export const pusher = new Pusher({
    appId: "1804963",
    key: "f140fe9841521d0cfc33",
    secret: "94412b492c0fcc165938",
    cluster: "eu",
    useTLS: true,
});
