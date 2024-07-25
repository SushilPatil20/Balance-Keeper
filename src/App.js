import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cards, setCard] = useState(() => {
    const saveCards = localStorage.getItem("cards");
    return saveCards ? JSON.parse(saveCards) : [];
  });
  const [title, setTitle] = useState("");
  const [amount, seAmount] = useState("");

  // Store it into the localstorage
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount) {
      alert("Please add title and amount");
      return;
    }
    let object = {
      title: title,
      amount: parseFloat(amount),
    };
    setCard([...cards, object]);
    setTitle("");
    seAmount("");
  };

  function formateCurrency(currency) {
    return `${currency} ₹`;
  }

  function removeCard(index) {
    const newArray = cards.filter((_, idx) => idx !== index);
    setCard([...newArray]);
  }

  // const totalAmount = cards.reduce((total, card) => total + card.amount, 0);
  const totalAmount = cards.reduce((total, card) => total + card.amount, 0);

  return (
    <div className="App">
      <header className="App-header flex items-center flex-col">
        <h2 className="my-14 text-white text-2xl">
          Total Unpaid : {formateCurrency(totalAmount)}
        </h2>
        <form className="min-h-40 space-y-8  w-1/2" onSubmit={onSubmit}>
          <section className="space-y-2">
            <label htmlFor="title" className="block text-3xl text-white">
              Title
            </label>
            <input
              type="text"
              className="p-2 w-full outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
            />
          </section>
          <section className="space-y-2">
            <label htmlFor="mony" className="block text-3xl text-white">
              Amount
            </label>
            <input
              type="number"
              className="p-2 w-full outline-none"
              value={amount}
              onChange={(e) => seAmount(e.target.value)}
              id="mony"
            />
          </section>
          <button
            type="submit"
            className="px-8 py-2 text-xl bg-white 
          active:scale-105 rounded-md text-gray-800 mx-auto block"
          >
            Submit
          </button>
        </form>
        <section className="mt-12 w-1/2 space-y-3">
          <h2 className="text-white text-2xl">Taken from</h2>
          <section className="flex">
            <ul className="text-white w-full space-y-4">
              {cards.map((card, index) => (
                <li
                  key={index}
                  className="bg-black h-12 w-full flex items-center justify-between px-4"
                  onDoubleClick={() => removeCard(index)}
                >
                  <p>{card.title}</p>
                  <strong>{formateCurrency(card.amount)}</strong>
                </li>
              ))}
            </ul>
          </section>
        </section>
      </header>
    </div>
  );
}

export default App;
