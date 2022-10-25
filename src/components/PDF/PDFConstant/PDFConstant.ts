import { StyleSheet } from '@react-pdf/renderer';

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

export const styles = StyleSheet.create(
  {
    page: {
      flexDirection: 'column',
      backgroundColor: 'white',
      fontSize: '12px',
    },
    container: {
      width: '90%',
      margin: '0 auto',
    },

    content: {
      marginTop: '24px',
    },
    content_row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    content_column: {
      flexDirection: 'column',
    },
    content_table: {
      flexDirection: 'column',
      display: 'flex',
    },

    image: {
      maxWidth: '150px',
    },
    subtitle: {
      fontWeight: 'bold',
    },
  },
);
