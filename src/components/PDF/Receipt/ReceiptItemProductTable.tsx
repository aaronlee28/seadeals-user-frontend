import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { OrderItem } from './ReceiptDocument';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: '#bff0fd',
    borderBottomWidth: 1,
    alignItems: 'flex-start',
    height: 24,
    fontStyle: 'bold',
    textAlign: 'left',
  },
  product_info: {
    width: '60%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
  qty: {
    width: '10%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
  price_per_item: {
    width: '15%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
  total: {
    width: '15%',
    textAlign: 'left',
    margin: 'auto 12px',
  },
});


const ReceiptItemProductTable = ({ orderItems }:{ orderItems:Array<OrderItem> }) => {
  const rows = orderItems?.map( item =>
    <View style={styles.row} key={item.name.toString()}>
        <Text style={styles.product_info}>{item.name}</Text>
        <Text style={styles.qty}>{item.quantity}</Text>
        <Text style={styles.price_per_item}>{item.price_per_item}</Text>
        <Text style={styles.total}>{(item.subtotal).toFixed(2)}</Text>
    </View>,
  );
  return (<Fragment>{rows}</Fragment> );
};

export default ReceiptItemProductTable;
