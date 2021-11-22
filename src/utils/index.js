/**
 *
 * @param {string} url the first string in url(the main API url)
 * @param {string | null} name if present its attached to the url with `/name`
 * @returns returns the merged URL, if name present then includes `/name.json` else doesn't
 */
export const getEndpoint = (url, name) => `${url}${name ? `/${name}` : ''}.json`
