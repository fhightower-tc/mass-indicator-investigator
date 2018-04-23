export interface EnrichmentLink {
    name: string;
    link: string;
};

export interface Results {
    [key: string]: {
        [key: string]: {
            a: string,
            b: string
        }
    }
};
