import React, { useState, useContext } from 'react';
import { Input, Dropdown, Grid, Form } from 'semantic-ui-react';
import { BillingsContext } from '../context/BillingsContext';
import { countries } from 'jsvat';
import { find } from 'lodash';

export default props => {

    const [ isEU, setIsEU ] = useState ( false );
    const [ stateOptions, setStateOptions ] = useState ([]);
    const { data, errors, setErrors } = useContext ( BillingsContext );
    const { country, setCountry, vat, setVat, state, setState } = props;

    let countryOptions = [];
    if ( data.countries ) {
        countryOptions = data.countries.map ( el => ({
            key: el.country,
            value: el.country,
            text: el.country
        }));
    }

    const changeCountry = ( e, { value }) => {
        setErrors ( [] );
        setCountry ( value );
        setIsEU ( !!find ( countries, { name: value }));
        const { states } = find ( data.countries, { country: value });
        if ( states ) {
            setStateOptions (
                states.map ( state => ({
                    key: state,
                    value: state,
                    text: state
                }))
            );
        }
    }

    const changeVat = ({ target }) => {
        setErrors ( [] );
        setVat ( target.value );
    }

    const changeState = ( e, { value }) => {
        setErrors ( [] );
        setState ( value );
    }

    return (
        <>
            <Grid columns={ isEU ? 2 : 1 } className="country-component">
                <Grid.Column>
                    <Form.Field
                        control={Dropdown}
                        fluid
                        selection
                        label='Country'
                        placeholder='Country'
                        value={country}
                        options={countryOptions} 
                        onChange={changeCountry} 
                        error={ errors.country }
                    />
                </Grid.Column>
                {
                    isEU ? (
                        <Grid.Column>
                            <Form.Field
                                control={Input}
                                label='VAT ID'
                                placeholder='VAT ID'
                                value={vat} 
                                onChange={changeVat}
                                error={ errors.vat }
                            />
                        </Grid.Column>
                    )
                    : <></>
                }
            </Grid>
            {
                stateOptions.length ? (
                    <Form.Field
                        control={Dropdown}
                        label='State'
                        placeholder='State'
                        value={state} 
                        onChange={changeState}
                        options={stateOptions}
                        fluid
                        selection
                        error={ errors.state }
                    />
                )
                : <></>
            }
        </>
    );
}