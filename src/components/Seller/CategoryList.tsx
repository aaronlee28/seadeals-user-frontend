import React, { FC } from 'react';
import CardCategory from '../Cards/CardCategory/CardCategory';

const CategoryList:FC<any> = ({ categories, setCategory }) => (
  <div className="container d-flex gap-3 px-0 py-3">
    {
        categories.map((category:any) => {
          const data = { name: category.name, imgUrl: category.icon_url };
          return (
            <button
              key={category.id}
              type="button"
              className="hover-click bg-inherit"
              onClick={() => setCategory(category.id)}
            >
              <CardCategory data={data} />
            </button>
          );
        })
    }
  </div>
);

export default CategoryList;
