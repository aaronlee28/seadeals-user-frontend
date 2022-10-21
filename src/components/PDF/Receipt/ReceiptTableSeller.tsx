import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import { OrderPayment } from './ReceiptDocument';
import ReceiptItemSellerTable from './ReceiptItemSellerTable';
import ReceiptHeaderSellerTable from './ReceiptHeaderSellerTable';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    margin: 24,
  },
});

const ReceiptTableSeller = ({ orderPayments }:{ orderPayments:Array<OrderPayment> }) => {
  return (
        <View style={styles.tableContainer}>
            <ReceiptHeaderSellerTable />
            <ReceiptItemSellerTable orderPayments={orderPayments} />
        </View>
  );
};

export default ReceiptTableSeller;
