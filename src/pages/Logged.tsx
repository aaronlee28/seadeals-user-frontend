import React from 'react';
import { Link } from 'react-router-dom';

const Logged = () => (
  <>
    <h1>Logged in User</h1>
    <Link to="/seller">to seller</Link>
  </>
);

export default Logged;
