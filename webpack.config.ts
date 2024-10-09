import path from 'path';
import webpack from 'webpack';
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths, BuildPlatform } from "./config/build/type/type";

interface EnvVariables {
    mode?: BuildMode,
    port?: number,
    analyzer?: boolean,
    platform?: BuildPlatform
}

export default (env: EnvVariables) => {
    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer, //if run `npm run build:prod -- --env analyzer=true`, then analyzer will be open in browser
        platform: env.platform ?? 'desktop'
    })

    return config;
}