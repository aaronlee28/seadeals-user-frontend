import React, { useEffect, useState } from 'react';
import './User.scss';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Cities from '../../api/cities';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const User = () => {
  const uRL = '/user/profiles/addresses';
  const axiosPrivate = useAxiosPrivate();
  const [focus, setFocus] = useState('address');
  const [cityId, setCityId] = useState('152');
  const [provinceId, setProvinceId] = useState('6');
  const [type, setType] = useState('Kota');
  const [subDistrict, setSubDistrict] = useState('');
  const [province, setProvince] = useState('DKI Jakarta');
  const [city, setCity] = useState('Jakarta Selatan');
  const [postalCode, setPostalCode] = useState('');
  const [address, setAddress] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  useEffect(() => {
    getAllProvince();
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

  const navigate = useNavigate();
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
        <div className="profile_container col-8 col-md-8">
          {
              focus === 'profile'
                && (
                  <div className="address_container row p-2 border-bottom">
                    <div className="col-6 col-md-4 col-lg-3">
                      Profil
                    </div>
                  </div>
                )
          }
          {
            focus === 'address'
              && (
                <div className="address_container row p-2 border-bottom">
                  <div className="col-6 col-md-4 col-lg-3">
                    Alamat Saya
                  </div>
                  <div className="col-6 col-md-4 col-lg-3">
                    <Button buttonType="primary" text="Tambah alamat" handleClickedButton={handleShow} />
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
                </div>
              )
          }
          {
              focus === 'payment-account'
                && (
                  <div className="address_container row p-2 border-bottom">
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
