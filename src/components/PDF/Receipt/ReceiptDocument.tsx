import React from 'react';
import {
  Document, Page, View, Text, Image,
} from '@react-pdf/renderer';
import Logo from '../../../assets/png/logo_sea_deals.png';
import { Receipt, styles } from '../PDFConstant/PDFConstant';
import ReceiptTableProduct from './ReceiptTableProduct';
import ReceiptTableSeller from './ReceiptTableSeller';

const ReceiptDocument = ({ data }:{ data:Receipt }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      <View style={styles.container}>

        <View style={styles.content}>
          <View style={styles.content_row}>
            <Image style={styles.image} src={Logo} />
            <View>
              <Text>Invoice</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.content_row}>
            <View style={styles.content_column}>
              <Text style={styles.subtitle}>Diterbitkan Atas Nama</Text>
              <Text>
                Penjual :
                {data?.seller_name}
              </Text>
            </View>
            <View style={styles.content_column}>
              <Text style={styles.subtitle}>Untuk</Text>
              <Text>
                Pembeli:
                {data?.buyer?.name}
              </Text>
              <Text>
                Tanggal Pembelian:
                {data?.buyer?.bought_date}
              </Text>
              <Text>
                Alamat Pengiriman:
                {data?.buyer?.address}
              </Text>
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
              <Text>{`${data?.courier?.name} - ${data?.courier?.service}`}</Text>
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

export default ReceiptDocument;
