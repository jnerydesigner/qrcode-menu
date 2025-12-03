export const replaceManyWordsTemplate = (template: string, wordsToReplacement: string[]) => {
    let result = template;

    wordsToReplacement.forEach((word, index) => {
        const placeHolder = `\\{\\{${index}\\}\\}`;
        result = result.replace(new RegExp(placeHolder, "g"), word);
    });

    return result;
};
