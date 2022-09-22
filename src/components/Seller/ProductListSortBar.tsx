import React, { FC } from 'react';

const ProductListSortBar: FC<any> = ({
  activeOrder, activeOpt, setOpt, setOrder,
}) => (
  <div className="d-flex gap-3 align-items-center">
    <p>Urutkan</p>
    <button
      type="button"
      className={`btn px-3 ${activeOpt === 'price' ? 'bg-accent text-white' : 'bg-white text-black border'}`}
      onClick={() => { setOpt('price'); }}
    >
      Harga
    </button>
    <button
      type="button"
      className={`btn px-3 ${activeOpt === 'date' ? 'bg-accent text-white' : 'bg-white text-black border'}`}
      onClick={() => { setOpt('date'); }}
    >
      Tanggal
    </button>
    <select onChange={(e) => setOrder(e.target.value)} className="form-select dropdown-select" value={activeOrder}>
      <option value="asc">{activeOpt === 'date' ? 'Terakhir' : 'Harga Terendah'}</option>
      <option value="desc">{activeOpt === 'date' ? 'Terbaru' : 'Harga Tertinggi'}</option>
    </select>
  </div>
);

export default ProductListSortBar;
