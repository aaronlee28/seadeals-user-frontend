import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Orders from '../../../../api/orders';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import Pagination from '../../../../components/Pagination/Pagination';
import CardOrderHistory from '../../../../components/Cards/CardOrderHistory/CardOrderHistory';

import './OrderHistoryItems.scss';
import ORDER_STATUS from '../../../../constants/order';

const OrderHistoryItems = () => {
  const [orders, setOrders] = useState<any>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPage: 1,
  });

  const [params, setParams] = useSearchParams();
  const getTypeParams = params.get('type');
  const innerRef = useRef(null);
  const axiosPrivate = useAxiosPrivate();

  const splitOrders = (allOrders: any[]) => {
    const tempOrders = allOrders.map(
      (order: any) => {
        const {
          seller,
          voucher,
          transaction,
          status,
        } = order;
        const orderItems = order.order_items;

        const tempItem = orderItems?.map(
          (item: any) => {
            const productDetails = item.product_detail;
            const {
              name,
              slug,
              variant,
              price,
            } = productDetails;

            return {
              id: productDetails.id,
              imgUrl: productDetails.photo_url,
              name,
              slug,
              priceBase: price,
              pricePromotion: price,
              variantId: item.product_variant_detail_id,
              variant,
              quantity: item.quantity,
            };
          },
        );

        const tempStatus = ORDER_STATUS.find(
          (el: any) => el.onDatabase === status,
        );

        return {
          orderId: order.id,
          storeId: order.seller_id,
          storeName: seller.name,
          status: tempStatus?.display,
          reviewed: order.has_reviewed_all_item,
          transaction,
          voucher,
          updatedAt: order.updated_at,
          totalPricePromotion: order.total_order_price_after_disc + order.total_delivery,
          totalPriceBase: order.total_order_price + order.total_delivery,
          storeItems: tempItem,
        };
      },
    );

    setOrders(tempOrders);
  };

  const getStatusFilter = () => {
    if (getTypeParams === 'on-process') {
      // return '&filter=waiting for payment';
      return '&filter=waiting for seller';
    }
    if (getTypeParams === 'delivered') {
      // return '&filter=on delivery';
      return '&filter=on delivery,delivered';
    }
    if (getTypeParams === 'completed') {
      return '&filter=done';
    }
    if (getTypeParams === 'canceled') {
      // return '&filter=refunded';
      return '&filter=complaint,refunded';
    }
    return '';
  };

  const getOrders = async () => {
    const filter = `?page=${pagination.page}${getStatusFilter()}`;
    await Orders.GetAllOrdersByUser(axiosPrivate, filter)
      .then((resp: any) => {
        const result = resp.data.data;
        if (result.orders) {
          splitOrders(result.orders);
          setPagination((prevState) => ({
            ...prevState,
            totalPage: result.total_page,
          }));
        }
        if (!result.orders) {
          setOrders([]);
        }
      })
      .catch((err: any) => err);
  };

  const handlePagination = (newPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      page: newPage,
    }));

    params.set('page', String(newPage));
    setParams(params);
  };

  useEffect(() => {
    params.set('page', String(pagination.page));
    params.set('type', 'all');
    setParams(params);

    getOrders().then();
  }, []);

  useEffect(() => {
    getOrders().then();
  }, [
    pagination.page,
    getTypeParams,
  ]);

  return (
    <div className="order-history-items_container">
      <div className="order-history-items_content" ref={innerRef}>
        {
          orders.length === 0
          && (
            <div className="empty">
              <p className="text">Belum ada pesanan</p>
            </div>
          )
        }
        {
          orders.length > 0
          && (
            <div className="items">
              {
                orders.map(
                  (order: any) => (
                    <CardOrderHistory
                      key={`${order.orderId}-${order.storeName}`}
                      data={order}
                    />
                  ),
                )
              }
              <Pagination
                page={pagination.page}
                totalPage={pagination.totalPage}
                setPage={handlePagination}
                innerRef={innerRef}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default OrderHistoryItems;
