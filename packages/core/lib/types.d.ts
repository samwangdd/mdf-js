/**
 * @file service types
 */
export declare enum PluginType {
    add = "add",
    modify = "modify",
    event = "event",
    compose = "compose",
    flush = "flush"
}
export declare type PluginsOpts = {
    key: string;
    type: PluginType;
    initValue?: any;
    args?: any[];
};
export interface IConfig {
    publicPath?: string;
    history?: any;
    framework?: string;
    presets?: string[];
    plugins?: string[];
    envs?: string[];
    [key: string]: any;
}
export interface IPaths {
    absSrcPath: string;
    absTmpPath: string;
    absNodeModulesPath: string;
}
export interface ICommand {
    name: string;
    alias?: string;
    description?: string;
    details?: string;
    fn: {
        (args: any): void;
    };
}
