import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useCart } from "../../context/CartContext.jsx";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [buyer, setBuyer] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  if (cart.length === 0 && !orderId) {
    return (
      <section className="checkout-container">
        <h2>No hay Pokémon en tu carrito</h2>
        <p className="info-msg">
          Agregá algunos compañeros antes de finalizar la compra.
        </p>
      </section>
    );
  }

  const handleChange = (e) => {
    setBuyer({
      ...buyer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!buyer.name || !buyer.email || !buyer.phone) {
      setErrorMsg("Por favor, completá todos los campos.");
      return;
    }

    const order = {
      buyer,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
      createdAt: serverTimestamp(),
    };

    try {
      setLoading(true);
      const ordersRef = collection(db, "orders");
      const docRef = await addDoc(ordersRef, order);
      setOrderId(docRef.id);
      clearCart();
    } catch (error) {
      console.error("Error creando orden:", error);
      setErrorMsg("Ocurrió un error al generar la orden. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (orderId) {
    return (
      <section className="checkout-container">
        <h2>¡Gracias por tu compra!</h2>
        <p>
          Tu ID de adopción Pokémon es: <strong>{orderId}</strong>
        </p>
        <p className="info-msg">
          Conservá este identificador como comprobante de tu orden.
        </p>
      </section>
    );
  }

  return (
    <section className="checkout-container">
      <h2>Finalizar compra</h2>
      <p>Total: ${totalPrice}</p>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input
            type="text"
            name="name"
            value={buyer.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={buyer.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Teléfono
          <input
            type="tel"
            name="phone"
            value={buyer.phone}
            onChange={handleChange}
            required
          />
        </label>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </section>
  );
};

export default CheckoutForm;
