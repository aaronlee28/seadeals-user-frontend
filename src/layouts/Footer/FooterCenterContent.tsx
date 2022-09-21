import React from 'react';

const FooterCenterContent = () => {
  const items = [
    {
      name: 'Audio',
      path: '',
    },
    {
      name: 'Fotografi',
      path: '',
    },
    {
      name: 'Handphone & Aksesoris',
      path: '',
    },
    {
      name: 'Hobi',
      path: '',
    },
    {
      name: 'Jam Tangan',
      path: '',
    },
    {
      name: 'Komputer & Aksesoris',
      path: '',
    },
    {
      name: 'Peralatan Rumah Tangga',
      path: '',
    },
    {
      name: 'Lainnya',
      path: '',
    },
  ];
  return (
    <div className="center_content">
      <h5 className="title">Kategori</h5>
      <div className="items_content">
        {
          items.map(
            (item) => (
              <div
                key={`${item.name}`}
                className="item"
              >
                <a
                  href={item.path}
                >
                  { item.name }
                </a>
              </div>
            ),
          )
        }
      </div>
    </div>
  );
};

export default FooterCenterContent;
