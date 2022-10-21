import React from 'react';
import { StyleSheet, View } from '@react-pdf/renderer';
import ReceiptHeaderProductTable from './ReceiptHeaderProductTable';
import { OrderItem } from './ReceiptDocument';
import ReceiptItemProductTable from './ReceiptItemProductTable';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection:'row',
    flexWrap: 'wrap',
    margin: 24,
  },
});

const ReceiptTableProduct = ({ orderItems }:{ orderItems:Array<OrderItem> }) => {
  return (
    <View style={styles.tableContainer}>
      <ReceiptHeaderProductTable/>
      <ReceiptItemProductTable orderItems={orderItems} />
    </View>
  );
};

export default ReceiptTableProduct;
