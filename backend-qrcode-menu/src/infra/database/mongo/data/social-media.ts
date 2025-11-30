import { normalizeSvgBeforeSave } from "@infra/utils/normalize-svg-before-save";

const instagram = '<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"> <rect x=\"2\" y=\"2\" width=\"28\" height=\"28\" rx=\"6\" fill=\"url(#paint0_radial_87_7153)\"/> <rect x=\"2\" y=\"2\" width=\"28\" height=\"28\" rx=\"6\" fill=\"url(#paint1_radial_87_7153)\"/> <rect x=\"2\" y=\"2\" width=\"28\" height=\"28\" rx=\"6\" fill=\"url(#paint2_radial_87_7153)\"/> <path d=\"M23 10.5C23 11.3284 22.3284 12 21.5 12C20.6716 12 20 11.3284 20 10.5C20 9.67157 20.6716 9 21.5 9C22.3284 9 23 9.67157 23 10.5Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M16 21C18.7614 21 21 18.7614 21 16C21 13.2386 18.7614 11 16 11C13.2386 11 11 13.2386 11 16C11 18.7614 13.2386 21 16 21ZM16 19C17.6569 19 19 17.6569 19 16C19 14.3431 17.6569 13 16 13C14.3431 13 13 14.3431 13 16C13 17.6569 14.3431 19 16 19Z\" fill=\"white\"/> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M6 15.6C6 12.2397 6 10.5595 6.65396 9.27606C7.2292 8.14708 8.14708 7.2292 9.27606 6.65396C10.5595 6 12.2397 6 15.6 6H16.4C19.7603 6 21.4405 6 22.7239 6.65396C23.8529 7.2292 24.7708 8.14708 25.346 9.27606C26 10.5595 26 12.2397 26 15.6V16.4C26 19.7603 26 21.4405 25.346 22.7239C24.7708 23.8529 23.8529 24.7708 22.7239 25.346C21.4405 26 19.7603 26 16.4 26H15.6C12.2397 26 10.5595 26 9.27606 25.346C8.14708 24.7708 7.2292 23.8529 6.65396 22.7239C6 21.4405 6 19.7603 6 16.4V15.6ZM15.6 8H16.4C18.1132 8 19.2777 8.00156 20.1779 8.0751C21.0548 8.14674 21.5032 8.27659 21.816 8.43597C22.5686 8.81947 23.1805 9.43139 23.564 10.184C23.7234 10.4968 23.8533 10.9452 23.9249 11.8221C23.9984 12.7223 24 13.8868 24 15.6V16.4C24 18.1132 23.9984 19.2777 23.9249 20.1779C23.8533 21.0548 23.7234 21.5032 23.564 21.816C23.1805 22.5686 22.5686 23.1805 21.816 23.564C21.5032 23.7234 21.0548 23.8533 20.1779 23.9249C19.2777 23.9984 18.1132 24 16.4 24H15.6C13.8868 24 12.7223 23.9984 11.8221 23.9249C10.9452 23.8533 10.4968 23.7234 10.184 23.564C9.43139 23.1805 8.81947 22.5686 8.43597 21.816C8.27659 21.5032 8.14674 21.0548 8.0751 20.1779C8.00156 19.2777 8 18.1132 8 16.4V15.6C8 13.8868 8.00156 12.7223 8.0751 11.8221C8.14674 10.9452 8.27659 10.4968 8.43597 10.184C8.81947 9.43139 9.43139 8.81947 10.184 8.43597C10.4968 8.27659 10.9452 8.14674 11.8221 8.0751C12.7223 8.00156 13.8868 8 15.6 8Z\" fill=\"white\"/> <defs> <radialGradient id=\"paint0_radial_87_7153\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(12 23) rotate(-55.3758) scale(25.5196)\"> <stop stop-color=\"#B13589\"/> <stop offset=\"0.79309\" stop-color=\"#C62F94\"/> <stop offset=\"1\" stop-color=\"#8A3AC8\"/> </radialGradient> <radialGradient id=\"paint1_radial_87_7153\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(11 31) rotate(-65.1363) scale(22.5942)\"> <stop stop-color=\"#E0E8B7\"/> <stop offset=\"0.444662\" stop-color=\"#FB8A2E\"/> <stop offset=\"0.71474\" stop-color=\"#E2425C\"/> <stop offset=\"1\" stop-color=\"#E2425C\" stop-opacity=\"0\"/> </radialGradient> <radialGradient id=\"paint2_radial_87_7153\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(0.500002 3) rotate(-8.1301) scale(38.8909 8.31836)\"> <stop offset=\"0.156701\" stop-color=\"#406ADC\"/> <stop offset=\"0.467799\" stop-color=\"#6A45BE\"/> <stop offset=\"1\" stop-color=\"#6A45BE\" stop-opacity=\"0\"/> </radialGradient> </defs> </svg>'

const normaliseInstagram = normalizeSvgBeforeSave(instagram)

const facebook = '<svg width=\"800px\" height=\"800px\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\"><path fill=\"#1877F2\" d=\"M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z\"/><path fill=\"#ffffff\" d=\"M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z\"/></svg>'

const normalizeFacebook = normalizeSvgBeforeSave(facebook)

const linkedin = '<svg height=\"800px\" width=\"800px\" version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 382 382\" xml:space=\"preserve\"> <path style=\"fill:#0077B7;\" d=\"M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889 C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056 H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502-10.056,10.056-10.056h42.806 c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1 s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73 c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079 c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426 c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472 L341.91,330.654L341.91,330.654z\"/> </svg>';

const normalizeLinkedin = normalizeSvgBeforeSave(linkedin)


export const socialMediaData = [
    {
        name: 'Instagram',
        slug: 'instagram',
        link: 'https://instagram.com/minhacompany',
        svg_path: normaliseInstagram,
        company: ''
    },
    {
        name: 'Facebook',
        slug: 'facebook',
        link: 'https://facebook.com/minhacompany',
        svg_path: normalizeFacebook,
        company: ''
    },
    // {
    //     name: 'Twitter',
    //     slug: 'twitter',
    //     link: 'https://twitter.com/minhacompany',
    //     svg_path: '',
    //     company: ''
    // },
    {
        name: 'LinkedIn',
        slug: 'linkedin',
        link: 'https://linkedin.com/company/minhacompany',
        svg_path: normalizeLinkedin,
        company: ''
    },
    // {
    //     name: 'WhatsApp',
    //     slug: 'whatsapp',
    //     link: 'https://wa.me/1234567890',
    //     svg_path: '',
    //     company: ''
    // }
];