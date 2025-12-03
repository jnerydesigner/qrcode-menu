import { Injectable } from "@nestjs/common";
import * as fs from 'node:fs/promises';
import * as path from 'node:path';



@Injectable()
export class TemplateEngine {

    private partialDir = path.resolve(__dirname, '../../application/templates/partials');


    async render(
        templateDir: string,
        templateFile: string,
        replacements: Record<string, string>,
        context: any,
    ): Promise<string> {
        let template = await fs.readFile(path.join(templateDir, templateFile), 'utf8');

        template = await this.applyPartials(template, context);
        template = this.applyReplacements(template, replacements);

        return template;
    }

    private applyReplacements(template: string, replacements: Record<string, string>) {
        let output = template;
        for (const key in replacements) {
            const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
            output = output.replace(regex, replacements[key]);
        }
        return output;
    }

    private async applyPartials(template: string, context: any): Promise<string> {
        const includeRegex = /{{\s*include\s+"([^"]+)"([^}]*)}}/g;

        let match;
        while ((match = includeRegex.exec(template)) !== null) {
            const [fullMatch, partialName, paramsStr] = match;

            const partialPath = path.join(this.partialDir, `${partialName}.html`);
            let partial = await fs.readFile(partialPath, 'utf8');

            const params = this.parseParams(paramsStr, context);

            partial = this.applyReplacements(partial, params);

            template = template.replace(fullMatch, partial);
        }

        return template;
    }

    private parseParams(paramsStr: string, context: any): Record<string, string> {
        const params: Record<string, string> = {};
        const paramRegex = /(\w+)\s*=\s*"([^"]*)"/g;

        let match;
        while ((match = paramRegex.exec(paramsStr)) !== null) {
            let [, key, value] = match;
            params[key] = this.applyReplacements(value, context);
        }

        return params;
    }
}
