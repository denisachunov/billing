import React from 'react';
// import BillingList from './components/BillingList';
import AddBilling from './components/AddBilling';
import BillingsList from './components/BillingsList';
import BillingContextProvider from './context/BillingsContext';
import { Header, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

export default () => {

    return (
      <BillingContextProvider>
        <Container>
          <Header as='h1' className="billing-header">
            AppFollow Test App
          </Header>
          <AddBilling />
          <BillingsList />
        </Container>
      </BillingContextProvider>
    );
}