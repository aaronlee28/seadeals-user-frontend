import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import ReceiptHeaderProductTable from './ReceiptHeaderProductTable';
import ReceiptItemProductTable from './ReceiptItemProductTable';
import { OrderItem } from '../PDFConstant/PDFConstant';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '24px 0',
  },
});

const ReceiptTableProduct = ({ orderItems }:{ orderItems:Array<OrderItem> }) => (
  <View style={styles.tableContainer}>
    <ReceiptHeaderProductTable />
    <ReceiptItemProductTable orderItems={orderItems} />
  </View>
);

export default ReceiptTableProduct;
