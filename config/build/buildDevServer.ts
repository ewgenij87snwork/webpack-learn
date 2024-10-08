import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

export function buildDevServer(): DevServerConfiguration {
    return {
        port: env.port ?? 4500,
        open: true // for immediately open in browser (on macOs not possible set some specific browser. Will open in default)
    }
}