export const getEndpoint = (url, name) => `${url}${name ? `/${name}` : ''}.json`
