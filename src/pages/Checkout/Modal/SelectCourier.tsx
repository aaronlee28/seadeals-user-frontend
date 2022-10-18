import React, { FC } from 'react';
import Modal from '../../../components/Modal/Modal';
import CourierOptions from './CourierOptions';
import useSellerDeliveryOptions from '../../../hooks/useSellerDeliveryOptions';
import LoadingPlain from '../../../components/Loading/LoadingPlain';
import formatTitle from '../../../utils/titleFormatter';

interface SelectCourierProps {
  sellerID: number,
  show: boolean,
  setShow: (status:boolean)=>void,
  selectedID: number,
  setCourier: (courier: any)=>void,
}

const SelectCourier:FC<SelectCourierProps> = ({
  sellerID, show, setShow, selectedID, setCourier,
}) => {
  const { loadingCouriers, couriers } = useSellerDeliveryOptions(sellerID);

  return (
    <Modal cancel={() => setShow(false)} isOpen={show}>
      <div
        className="w-100 px-4 text-end hover-click"
        role="presentation"
        onClick={() => setShow(false)}
      >
        <small className="fs-2">&times;</small>
      </div>
      <div className="p-5 pt-3 w-100">
        <div className="d-flex justify-content-between">
          <p className="mb-4">Kurir yang tersedia untuk toko</p>
          <small className="text-secondary">(pilih salah satu)</small>
        </div>
        {
          loadingCouriers
            ? (
              <div className="text-center">
                <LoadingPlain height={56} />
                <small>Memuat Jasa Kirim..</small>
              </div>
            )
            : (
              <div className="text-start">
                {couriers.length === 0 && <p className="text-center text-secondary mt-3">Jasa Kirim Belum Tersedia untuk Toko Ini</p>}
                {couriers.map((courier:any) => (
                  <CourierOptions
                    key={courier.id}
                    isSelected={selectedID === courier.courier.id}
                    setOption={() => setCourier(courier?.courier)}
                    name={formatTitle(courier?.courier?.name)}
                  />
                ))}
              </div>
            )
          }
      </div>
    </Modal>
  );
};

export default SelectCourier;
