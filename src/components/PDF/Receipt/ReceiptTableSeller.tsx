import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import ReceiptItemSellerTable from './ReceiptItemSellerTable';
import ReceiptHeaderSellerTable from './ReceiptHeaderSellerTable';
import { OrderPayment } from '../PDFConstant/PDFConstant';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '24px 0',
  },
});

const ReceiptTableSeller = ({ orderPayments }:{ orderPayments:Array<OrderPayment> }) => (
  <View style={styles.tableContainer}>
    <ReceiptHeaderSellerTable />
    <ReceiptItemSellerTable orderPayments={orderPayments} />
  </View>
);

export default ReceiptTableSeller;
