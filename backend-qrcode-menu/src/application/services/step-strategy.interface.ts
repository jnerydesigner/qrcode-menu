export interface StepStrategy {
    getTemplateFile(context: any): string;

    getReplacements(context: any): Promise<Record<string, string>> | Record<string, string>;
}
