import 'reflect-metadata';

export const STEP_HANDLER_METADATA = 'STEP_HANDLER_METADATA';

export function StepHandler(step: number): ClassDecorator {
    return (target: any) => {
        Reflect.defineMetadata(STEP_HANDLER_METADATA, step, target);
    };
}
