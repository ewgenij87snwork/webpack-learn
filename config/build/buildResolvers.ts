import { Configuration } from "webpack";
import { BuildOptions } from "./type/type";

export function buildResolvers(options: BuildOptions): Configuration['resolve']  {
    return {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ],
        alias: {
            '@': options.paths.src
        }
    }
}