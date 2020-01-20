import { NgxsModuleOptions, NoopNgxsExecutionStrategy } from '@ngxs/store';
import { environment } from 'src/environments/environment';

export const ngxsConfig: NgxsModuleOptions = {
    developmentMode: !environment.production,
    selectorOptions: {
        // These Selector Settings are recommended in preparation for NGXS v4
        // (See above for their effects)
        suppressErrors: false,
        injectContainerState: false
    },
    compatibility: {
        strictContentSecurityPolicy: true
    },
    // This configuration was added because of router navigation being controlled from within Ngxs!
    // https://github.com/ngxs/store/pull/761
    executionStrategy: NoopNgxsExecutionStrategy
};