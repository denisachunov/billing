import { checkVAT, countries } from 'jsvat';
import { find } from 'lodash';

export default ( billing, setErrors ) => {

    const { name, company, country, vat, state, zip, address } = billing;

    const isValidName = /^[a-zA-Z]{2,}\s*[a-zA-Z]{2,}\s*$/.test ( name );
    const isValidCompany = company.length > 2;
    const isEU = !!find ( countries, { name: country });
    const isValidVat = !isEU || checkVAT ( vat, countries ).isValid;
    const isValidCountry = country.length;
    const isValidState = state.length;
    const isValidZip = Number ( zip ) && zip.length > 2;
    const isValidAddress = address.length > 6;

    const getError = content => ({
        content,
        pointing: 'below',
    })

    setErrors ({
        name: isValidName ? null : getError ( 'Please enter at least 2 words of 2 symbols' ),
        company: isValidCompany ? null : getError ( 'Please enter at least 3 symbols' ),
        vat: isValidVat ? null : getError ( 'Please enter a valid VAT' ),
        country: isValidCountry ? null : getError ( 'Please enter a valid country' ),
        state: isValidState ? null : getError ( 'Please enter a valid state' ),
        zip: isValidZip ? null : getError ( 'Please enter at least 3 symbols' ),
        address: isValidAddress ? null : getError ( 'Please enter at least 7 symbols' ),
    });

    return isValidName && isValidVat && isValidCompany && isValidCountry && isValidState 
                && isValidAddress && isValidZip;
}