import { isEropean, isValidVat, hasStates } from './countries';

export default ( billing, setErrors ) => {

    const { name, company, country, vat, state, zip, address, countries } = billing;

    const isName = /^[a-zA-Z]{2,}\s*[a-zA-Z]{2,}\s*$/.test ( name );
    const isCompany = company.length > 2;
    const isVat = !isEropean ( country ) || isValidVat ( vat );
    const isCountry = country.length;
    const isState = !hasStates ( country, countries ) || state.length;
    const isZip = Number ( zip ) && zip.length > 2;
    const isAddress = address.length > 6;

    const getError = content => ({
        content,
        pointing: 'below',
    })

    setErrors ({
        name: isName ? null : getError ( 'Please enter at least 2 words of 2 symbols' ),
        company: isCompany ? null : getError ( 'Please enter at least 3 symbols' ),
        vat: isVat ? null : getError ( 'Please enter a valid VAT' ),
        country: isCountry ? null : getError ( 'Please enter a valid country' ),
        state: isState ? null : getError ( 'Please enter a valid state' ),
        zip: isZip ? null : getError ( 'Please enter at least 3 symbols' ),
        address: isAddress ? null : getError ( 'Please enter at least 7 symbols' ),
    });

    return isName && isVat && isCompany && isCountry && isState && isAddress && isZip;
}