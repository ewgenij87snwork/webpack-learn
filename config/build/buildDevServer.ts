import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./type/type";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 4500,
        // open: true // for immediately open in browser (on macOs not possible set some specific browser. Will open in default)
    }
}