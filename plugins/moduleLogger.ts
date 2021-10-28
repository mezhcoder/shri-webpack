import { Compiler } from 'webpack';
import glob from 'fast-glob'
import { extname } from 'path'
import { writeFile } from 'fs/promises'

class ModuleLogger {
    options : any;

    constructor(options : any) {
        this.options = Object.assign({
            include: ['src/**']
        } as any, options)
    }
    apply(compiler: Compiler) {
        compiler.hooks.afterEmit.tap('ModuleLogger', async ({fileDependencies}) => {
            let modules = new Set(await glob(this.options.include, {
                ignore: [],
                absolute: true
            }));

            // @ts-ignore
            for (let depend of fileDependencies) {
                if (extname(depend) && !depend.includes('node_modules'))
                    modules.delete(depend);
            }
            await this.saveResult(modules);
        });
    }

    saveResult(modules : any) {
        let json = JSON.stringify(Array.from(modules.keys()), null, '\t');
        console.log(json);
        return writeFile(this.options.output, json);
    }
}

export default ModuleLogger;