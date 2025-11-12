import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import ItemDetail from "../ItemDetail/ItemDetail.jsx";

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const docRef = doc(db, "products", itemId);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          setProduct(null);
        }
      })
      .catch((error) => {
        console.error("Error cargando detalle:", error);
      })
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) return <p className="info-msg">Cargando detalle...</p>;
  if (!product) return <p className="info-msg">Producto no encontrado.</p>;

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
