import { useEffect } from "react";
import "./NavCategories.scss";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ICategory } from "../../@types/order";
import { fetchCategoriesThunk } from "../../store/middlewares/categories";

function NavCategories() {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();
  const categories: ICategory[] = useAppSelector(
    (state) => state.categories.list
  );
  // console.log(categories);
  useEffect(() => {
    // APRES le premier chargement de l'app on veut aller chercher les categories
    // App va dispatcher une action vers le thunk middleware qui s'occupe de l'appel API
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  return (
    <div className="NavCat">
      {categories.map((category) => (
        <button
          type="button"
          className="NavLink"
          onClick={() => setSearchParams({ category: category.id })}
          key={category.id}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
export default NavCategories;
