export function svgStringToComponent(svgString: string) {
    if (!svgString) return null;

    let cleaned = svgString
        // 5. força size 25px
        .replace("<svg", `<svg height="25px" width="25px"`);

    return (
        <span
            dangerouslySetInnerHTML={{ __html: cleaned }}
            aria-hidden="true"
        />
    );
}
