import React from 'react';
import { Document, Page, StyleSheet, View, Text, Image } from '@react-pdf/renderer';
import Logo from '../../../assets/png/logo_sea_deals.png';
import ReceiptTableProduct from './ReceiptTableProduct';
import ReceiptTableSeller from './ReceiptTableSeller';

export interface OrderItem {
  name: string
  weight: number
  quantity: number
  price_per_item: number
  subtotal: number
  variant: string
}

export interface OrderPayment {
  seller_name: string
  total_order: number
}

export interface Receipt {
  seller_name:string
  payment_method: string
  buyer: {
    name:string
    bought_date: string
    address:string
  }
  order_detail:{
    total_quantity:number
    total_order:number
    delivery_price:number
    total:number
    shop_voucher: {
      type: string
      name: string
      amount: number
      total_reduce: number
    }
    order_items: Array<OrderItem>
  }
  transaction: {
    total_transaction: number
    global_discount: [
      {
        seller_name:string
        name:string
        type:string
        amount:number
        total_reduced:number
      },
    ]
    order_payments: Array<OrderPayment>
    total: number
  }
  courier: {
    name:string
    service:string
  }
}

const styles = StyleSheet.create(
  {
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      fontSize: '12px',
    },
    container: {
      width:'90%',
      margin: '0 auto',
    },

    content: {
      marginTop: '24px',
    },
    content_row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent:'space-between',
    },
    content_column: {
      flexDirection: 'column',
    },
    content_table: {
      flexDirection: 'column',
      display:'flex',
    },

    image: {
      maxWidth:'150px',
    },
    subtitle: {
      fontWeight:'bold',
    },
  },
);

const ReceiptDocument = ({ data }:{ data:Receipt }) => {
  return (
    <Document>
      <Page size={'LETTER'} style={styles.page}>
        <View style={styles.container}>

          <View style={styles.content}>
            <View style={styles.content_row}>
              <Image style={styles.image} src={Logo}></Image>
              <View>
                <Text>Invoice</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.content_row}>
              <View style={styles.content_column}>
                <Text style={styles.subtitle}>Diterbitkan Atas Nama</Text>
                <Text>Penjual : {data?.seller_name}</Text>
              </View>
              <View style={styles.content_column}>
                <Text style={styles.subtitle}>Untuk</Text>
                <Text>Pembeli: {data?.buyer?.name}</Text>
                <Text>Tanggal Pembelian: {data?.buyer?.bought_date}</Text>
                <Text>Alamat Pengiriman: {data?.buyer?.address}</Text>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <ReceiptTableProduct orderItems={data?.order_detail?.order_items} />
          </View>

          <View style={styles.content}>
            <View style={styles.content_row}>
              <View style={styles.content_column} />
              <View style={styles.content_column}>
                <View style={styles.content_row}>
                  <Text>Total Harga</Text>
                  <Text>{data?.order_detail?.total_order}</Text>
                </View>
                <View style={styles.content_row}>
                  <Text>Biaya Kirim</Text>
                  <Text>{data?.order_detail?.delivery_price}</Text>
                </View>
                <View style={styles.content_row}>
                  <Text>Total Tagihan</Text>
                  <Text>{data?.order_detail?.total}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <ReceiptTableSeller orderPayments={data?.transaction?.order_payments} />
          </View>

          <View style={styles.content}>
            <View style={styles.content_row}>
              <View style={styles.content_column} />
              <View style={styles.content_column}>
                <View style={styles.content_row}>
                  <Text>Total Belanja</Text>
                  <Text>{data?.transaction?.total_transaction}</Text>
                </View>
                <View style={styles.content_row}>
                  <Text>Total Tagihan</Text>
                  <Text>{data?.transaction?.total}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.content}>
            <View style={styles.content_row}>
              <View style={styles.content_column}>
                <Text>Kurir</Text>
                <Text>{data?.courier?.name + ' - ' + data?.courier?.service}</Text>
              </View>
              <View style={styles.content_column}>
                  <Text>Metode Pembayaran</Text>
                  <Text>{data?.payment_method}</Text>
              </View>
            </View>
          </View>

        </View>
      </Page>
    </Document>
  );
};

export default ReceiptDocument;

