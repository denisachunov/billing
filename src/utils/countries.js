import { checkVAT, countries } from 'jsvat';
import { find } from 'lodash';

export const isEropean = country => !!find ( countries, { name: country });
export const isValidVat = vat => checkVAT ( vat, countries ).isValid;
export const hasStates = ( country, countryList ) => {
    let result = find ( countryList, { name: country });
    if ( result ) {
        result = result.states.length;
    }
    return result;
}