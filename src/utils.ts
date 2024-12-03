const NEW_LINE = "\n";

export function isNumber(char: string) {
    return /^\d$/.test(char);
}

export function linesToArray(text: string, delimiter?: string): string[] {
    if (!text) return [];
    return text.split(delimiter ?? NEW_LINE);
}