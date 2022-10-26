import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ReactComponent as IconCart } from '../../assets/svg/icon_cart.svg';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';
import SEARCH_INPUT from '../../constants/form';
import CartDropdown from './CartDropdown';
import useCartItems from '../../hooks/useCartItems';
import useAuth from '../../hooks/useAuth';

const NavbarCenterContent = () => {
  const { auth } = useAuth();
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const [search] = useSearchParams();
  const getCategoryParams = search.get('categoryName');

  const [showCart, setShowCart] = useState(false);
  const { loadingCart, cart } = useCartItems(5);

  const hasUser = !!auth.user;

  const showCartVisible = () => {
    if (!hasUser) return;
    setShowCart(true);
  };

  const goToCart = () => {
    navigate('/cart');
  };

  const handleInput = (event: any) => {
    event.preventDefault();
    setSearchInput(event.target.value);
  };

  const searchProduct = () => {
    navigate(`/search?${
      searchInput.length > 0
        ? `searchInput=${searchInput}`
        : ''
    }${
      getCategoryParams
        ? `&categoryName=${getCategoryParams}`
        : ''
    }`);
  };

  return (
    <div className="center_content">
      <Form
        formType="search_product"
        items={SEARCH_INPUT}
        values={searchInput}
        handleInput={handleInput}
        handleSubmitButton={searchProduct}
      />
      <div
        role="presentation"
        className="cart_icon py-4"
        onMouseEnter={() => showCartVisible()}
        onMouseLeave={() => setShowCart(false)}
      >
        {hasUser && (
        <div className="cart_total_number d-flex align-items-center justify-content-center rounded bg-main text-white">
          <small className="text-center mb-0 fw-bold d-flex align-items-center mt-1">
            {cart?.total_data || 0}
          </small>
        </div>
        )}
        <Button
          buttonType="plain"
          iconUrl={IconCart}
          iconName="cart"
          handleClickedButton={goToCart}
        />
        {showCart && (
          <CartDropdown
            loadingCart={loadingCart}
            cart={cart}
            setShowCart={() => setShowCart(true)}
          />
        )}
      </div>
    </div>
  );
};

export default NavbarCenterContent;
