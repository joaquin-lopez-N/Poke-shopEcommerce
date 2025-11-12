import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import ItemList from "../ItemList/ItemList.jsx";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);
    const productsRef = collection(db, "products");
    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    getDocs(q)
      .then((snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(items);
      })
      .catch((error) => {
        console.error("Error cargando productos:", error);
      })
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) return <p className="info-msg">Cargando Pokémon...</p>;

  if (products.length === 0)
    return (
      <section>
        {greeting && <h1>{greeting}</h1>}
        <p className="info-msg">No se encontraron Pokémon en esta categoría.</p>
      </section>
    );

  return (
    <section>
      {greeting && <h1>{greeting}</h1>}
      <ItemList products={products} />
    </section>
  );
};

export default ItemListContainer;
