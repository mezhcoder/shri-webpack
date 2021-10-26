import { Compiler } from 'webpack';

class ModuleLogger {
    apply(compiler: Compiler) {
        compiler.hooks.normalModuleFactory.tap(
            'ModuleLogger',
            (normalModuleFactory) => {
                normalModuleFactory.hooks.module.tap('ModuleLogger', (_module, _createData, resolveData) => {
                    // @ts-ignore
                    console.log(_createData.resource);

                    console.log(resolveData.context);

                    return _module;
                });
            }
        );
    }
}

export default ModuleLogger;