import React, { useContext } from 'react';
import { BillingsContext } from '../context/BillingsContext';
import { Table, Message, Dimmer, Loader } from 'semantic-ui-react';

export default () => {
    const { data, loading } = useContext ( BillingsContext );
    return (
        <>
            <Dimmer active={loading}>
                <Loader />
            </Dimmer>
            {
                data.data ? (
                    <Table celled selectable className="billing-list">
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Customer Full Name</Table.HeaderCell>
                                <Table.HeaderCell>Company Name</Table.HeaderCell>
                                <Table.HeaderCell>Country</Table.HeaderCell>
                                <Table.HeaderCell>State</Table.HeaderCell>
                                <Table.HeaderCell>Address</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {
                                data.data.map (({ name, company, country, state, address }, index ) => (
                                    <Table.Row key={index}>
                                        <Table.Cell>{name}</Table.Cell>
                                        <Table.Cell>{company}</Table.Cell>
                                        <Table.Cell>{country}</Table.Cell>
                                        <Table.Cell>{state}</Table.Cell>
                                        <Table.Cell>{address}</Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
                )
                : (
                    <Message info>
                        <Message.Header>There're no billings in the system</Message.Header>
                    </Message>
                )
            }
        </>
    );
}