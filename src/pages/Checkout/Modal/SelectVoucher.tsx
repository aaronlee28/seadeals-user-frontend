import React, { FC } from 'react';
import Modal from '../../../components/Modal/Modal';

interface SelectVoucherProps {
  show: boolean,
  setShow: (status:boolean)=>void,
  setVoucher: (code:string)=>void,
}

const SelectVoucher:FC<SelectVoucherProps> = ({ show, setShow, setVoucher }) => (
  <Modal cancel={() => setShow(false)} isOpen={show}>
    <div
      className="w-100 px-4 text-end hover-click"
      role="presentation"
      onClick={() => setShow(false)}
    >
      <small className="fs-2">&times;</small>
    </div>
    <div className="p-5 pt-3 w-100 modal_select_body">
      <div className="d-flex justify-content-between">
        <p className="mb-4">Kurir yang tersedia untuk toko</p>
        <small className="text-secondary">(pilih salah satu)</small>
      </div>
      <div className="text-start">
        <div
          className="border rounded p-3 hover-click mb-3"
          role="presentation"
          onClick={() => setVoucher('asd')}
        >
          <p>JNE</p>
        </div>
        <div
          className="border rounded p-3 hover-click mb-3"
          role="presentation"
          onClick={() => console.log('asd')}
        >
          <p>SiCepat</p>
        </div>
        <div
          className="border rounded p-3 hover-click mb-3"
          role="presentation"
          onClick={() => console.log('asd')}
        >
          <p>POS</p>
        </div>
      </div>
    </div>
  </Modal>
);

export default SelectVoucher;
