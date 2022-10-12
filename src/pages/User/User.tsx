import React, { useEffect, useState } from 'react';
import './User.scss';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Button from '../../components/Button/Button';
import Cities from '../../api/cities';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const User = () => {
  const uRL = '/user/profiles/addresses';
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [focus, setFocus] = useState('address');
  const [cityId, setCityId] = useState('152');
  const [provinceId, setProvinceId] = useState('6');
  const [type, setType] = useState('Kota');
  const [subDistrict, setSubDistrict] = useState('');
  const [province, setProvince] = useState('DKI Jakarta');
  const [city, setCity] = useState('Jakarta Selatan');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');
  const [newPostalCode, setNewPostalCode] = useState('');
  const [newAddress, setNewAddress] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEditModal, setShowEditModal] = useState(false);
  const handleShowEditModal = () => setShowEditModal(true);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const getAllProvince = async () => {
    await Cities.GetAllCities()
      .then((resp) => {
        const res = resp.data;
        let provinceIds: any[] = [];
        let provincesValues: any[] = [];
        for (let i = 0; i < res.length; i += 1) {
          const p = {
            province_id: res[i].province_id,
            province_name: res[i].province,
          };
          if (!provinceIds.includes(p.province_id)) {
            provinceIds = [...provinceIds, p.province_id];
            provincesValues = [...provincesValues, p];
          }
        }
        setProvinces(provincesValues);
      })
      .catch((err) => err);
  };

  const getCities = async () => {
    await Cities.GetAllCities()
      .then((resp) => {
        const res = resp.data;
        let values: any[] = [];
        for (let i = 0; i < res.length; i += 1) {
          const c = {
            province_id: res[i].province_id,
            province_name: res[i].province,
            city_id: res[i].city_id,
            city_name: res[i].city_name,
            type: res[i].type,
            isChecked: false,
          };
          if (province === c.province_name) {
            values = [...values, c];
          }
        }
        setCities(values);
      })
      .catch((err) => err);
  };

  const getProvinceId = (p:string) => {
    for (let i = 0; i < provinces.length; i += 1) {
      if (provinces[i].province_name === p) {
        return provinces[i].province_id;
      }
    }
    return 0;
  };

  const getCityId = (p:string) => {
    for (let i = 0; i < cities.length; i += 1) {
      if (cities[i].city_name === p) {
        return cities[i].city_id;
      }
    }
    return 0;
  };

  const getCityType = (p:string) => {
    for (let i = 0; i < cities.length; i += 1) {
      if (cities[i].city_name === p) {
        return cities[i].type;
      }
    }
    return '';
  };

  const [addresses, setAddresses] = useState<any[]>([]);
  const [mainAddress, setMainAddress] = useState<any>('');
  const getAddresses = async () => {
    try {
      const res = await axiosPrivate.get(
        uRL,
        {
          withCredentials: true,
        },
      );
      setAddresses(res.data.data);
    } catch (err) {
      navigate('/user', { replace: true });
    }
  };

  useEffect(() => {
    getAllProvince();
    getAddresses();
  }, []);

  useEffect(() => {
    if (province !== '') {
      getCities();
      setCity(province);
      setCityId(getCityId(province));
      setType(getCityType(province));
    }
  }, [province]);

  useEffect(() => {
    // @ts-ignore
    if (cities.length > 0) {
      setCity(cities[0].city_name);
      setCityId(cities[0].city_id);
      setType(cities[0].type);
    }
  }, [cities]);

  const handleSubmit = () => {
    try {
      axiosPrivate.post(
        uRL,
        JSON.stringify({
          province_id: provinceId,
          province,
          city_id: cityId,
          type,
          city,
          postal_code: postalCode,
          sub_district: subDistrict,
          address,
        }),
      );
      setShow(false);
    } catch (err) {
      navigate('/user', { replace: true });
    }
    window.location.reload();
  };

  const handleProfile = () => {
    setFocus('profile');
  };

  const handleAddress = () => {
    setFocus('address');
  };

  const handleAccount = () => {
    setFocus('payment-account');
  };

  const [addressId, setAddressId] = useState<any>(mainAddress.id);
  const [prevStateAID, setPrevStateAID] = useState<any>(mainAddress.id);
  const [checked, setChecked] = useState(false);

  const resetAddress = () => {
    if (addresses.length > 0) {
      for (let addressCount = 0; addressCount < addresses.length; addressCount += 1) {
        if (addresses[addressCount].is_main) {
          setMainAddress(addresses[addressCount]);
          if (checked) {
            window.location.reload();
          }
        }
      }
    }
  };

  useEffect(() => {
    resetAddress();
  }, [addresses]);

  useEffect(() => {
    if (addressId !== prevStateAID) {
      const accessToken:any = localStorage.getItem('access_token');
      const decode:any = jwt_decode(accessToken);
      const userId = decode.user.user_id;
      try {
        axiosPrivate.patch(
          `${uRL}/${addressId.toString()}`,
          JSON.stringify({
            id: Number(addressId),
            zipcode: postalCode,
            sub_district_id: 0,
            address,
            user_id: userId,
          }),
        );
        setShow(false);
        setPrevStateAID(addressId);
        getAddresses();
        setChecked(true);
      } catch (err) {
        navigate('/user', { replace: true });
      }
    }
  }, [addressId]);

  const [newAddressId, setNewAddressId] = useState<any>('');
  const [prevStateNewAID, setPrevStateNewAID] = useState<any>('');

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setNewAddressId('');
  };

  const handleSubmitEditForm = () => {
    const accessToken:any = localStorage.getItem('access_token');
    const decode:any = jwt_decode(accessToken);
    const userId = decode.user.user_id;
    try {
      axiosPrivate.patch(
        `${uRL}`,
        JSON.stringify({
          id: Number(newAddressId),
          postal_code: newPostalCode,
          sub_district_id: 0,
          address: newAddress,
          user_id: Number(userId),
        }),
      );
      setPrevStateNewAID(newAddressId);
      setShowEditModal(false);
    } catch (err) {
      navigate('/user', { replace: true });
    }
    window.location.reload();
  };

  useEffect(() => {
    if (newAddressId !== prevStateNewAID) {
      handleShowEditModal();
    }
  }, [newAddressId]);

  const handleSelectProvince = (e: any) => {
    setProvince(e.target.value);
    setProvinceId(getProvinceId(e.target.value));
  };

  const handleSelectCity = (e: any) => {
    setCity(e.target.value);
    setCityId(getCityId(e.target.value));
    setType(getCityType(e.target.value));
  };

  return (
    <div className="user_container">
      <div className="whole_container row">
        <div className="side-bar_container col-4 col-md-2">
          <p className="mb-2" onClick={handleProfile}>Profil</p>
          <p className="mb-2" onClick={handleAddress}>Alamat</p>
          <p onClick={handleAccount}>Akun Sea Labs Pay</p>
        </div>
        <div className="main-side_container col-8 col-md-8">
          {
              focus === 'profile'
                && (
                  <div className="address_container row">
                    <div className="col-6 col-md-4 col-lg-3">
                      Profil
                    </div>
                  </div>
                )
          }
          {
            focus === 'address'
              && (
                <div className="address_container">
                  <div className="header row">
                    <div className="h-text col-6 col-md-4 col-lg-3">
                      Alamat Saya
                    </div>
                    <div className="button col-6 col-md-4 col-lg-3">
                      <Button buttonType="primary" text="Tambah alamat" handleClickedButton={handleShow} />
                    </div>
                  </div>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Alamat Baru</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <select className="form-select mb-2" onChange={handleSelectProvince} defaultValue={province}>
                          {provinces.map((prov) => (
                            <option
                              key={prov.province_id}
                              value={prov.province_name}
                            >
                              {prov.province_name}
                            </option>
                          ))}
                        </select>
                        {
                         province && (
                         <select className="form-select mb-2" onChange={handleSelectCity} defaultValue={city}>
                           {cities.map((ci) => (
                             <option
                               key={ci.city_id}
                               value={ci.city_name}
                             >
                               {ci.city_name}
                             </option>
                           ))}
                         </select>
                         )
                        }
                        <input
                          className="form-control mb-2"
                          value={subDistrict}
                          onChange={(event) => setSubDistrict(event.target.value)}
                          id="sub-district"
                          placeholder="Kecamatan"
                          autoComplete="new-password"
                          required
                        />
                        <input
                          className="form-control mb-2"
                          value={postalCode}
                          onChange={(event) => setPostalCode(event.target.value)}
                          id="postal-code"
                          placeholder="Kode Pos"
                          autoComplete="new-password"
                          required
                        />
                        <textarea
                          className="form-control mb-2"
                          value={address}
                          onChange={(event) => setAddress(event.target.value)}
                          id="address"
                          placeholder="Isi alamat lengkap"
                          autoComplete="new-password"
                          required
                        />
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button buttonType="primary alt" text="Tutup" handleClickedButton={handleClose} />
                      <Button buttonType="primary" text="Simpan alamat" handleClickedButton={handleSubmit} />
                    </Modal.Footer>
                  </Modal>
                  <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Sunting Alamat</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <form>
                        <input
                          className="form-control mb-2"
                          value={newPostalCode}
                          onChange={(event) => setNewPostalCode(event.target.value)}
                          id="postal-code"
                          placeholder="Isi nomor kode pos baru"
                          autoComplete="new-password"
                          required
                        />
                        <textarea
                          className="form-control mb-2"
                          value={newAddress}
                          onChange={(event) => setNewAddress(event.target.value)}
                          id="address"
                          placeholder="Isi alamat lengkap baru"
                          autoComplete="new-password"
                          required
                        />
                      </form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button buttonType="primary alt" text="Tutup" handleClickedButton={handleCloseEditModal} />
                      <Button buttonType="primary" text="Sunting alamat" handleClickedButton={handleSubmitEditForm} />
                    </Modal.Footer>
                  </Modal>
                  {
                    mainAddress !== '' && (
                    <div className="children">
                      <div className="child row">
                        <div className="contents row">
                          <div className="order col-2">
                            Alamat utama
                          </div>
                          <div className="left-side col-8">
                            {mainAddress.province}
                            {', '}
                            {mainAddress.city}
                            {', '}
                            {mainAddress.sub_district}
                            {', '}
                            {mainAddress.postal_code}
                            <br />
                            {mainAddress.address}
                          </div>
                          <div className="right-side col-2">
                            <p role="button" onClick={() => setNewAddressId(mainAddress.id)}>
                              Edit
                            </p>
                          </div>
                        </div>
                      </div>
                      { addresses.map((a:any) => (
                        !a.is_main
                              && (
                              <div className="child row" key={a.id}>
                                <div className="contents row">
                                  <div className="order col-2" />
                                  <div className="left-side col-8">
                                    {a.province}
                                    {', '}
                                    {a.city}
                                    {', '}
                                    {a.sub_district}
                                    {', '}
                                    {a.postal_code}
                                    <br />
                                    {a.address}
                                  </div>
                                  <div className="right-side col-2">
                                    <p role="button" onClick={() => setAddressId(a.id)}>
                                      Jadikan utama
                                    </p>
                                    <p role="button" onClick={() => setNewAddressId(a.id)}>
                                      Edit
                                    </p>
                                  </div>
                                </div>
                              </div>
                              ))) }
                    </div>
                    )
                  }
                </div>
              )
          }
          {
              focus === 'payment-account'
                && (
                  <div className="address_container row">
                    <div className="col-6 col-md-4 col-lg-3">
                      Akun Sea Labs Pay
                    </div>
                  </div>
                )
          }
        </div>
      </div>
    </div>
  );
};

export default User;
