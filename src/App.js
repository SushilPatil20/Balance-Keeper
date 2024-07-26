import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cards, setCard] = useState(() => {
    return JSON.parse(localStorage.getItem("cards")) || [];
    // return saveCards ?  : [];
  });
  const [title, setTitle] = useState("");
  const [amount, seAmount] = useState("");

  // whenever cards is are updated we Store the cards
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

  const formateCurrency = (currency) => {
    return `${currency.toLocaleString("en-IN")} ₹`;
  };

  function removeCard(index) {
    const newArray = cards.filter((_, idx) => idx !== index);
    setCard([...newArray]);
  }

  // const totalAmount = cards.reduce((total, card) => total + card.amount, 0);
  const totalAmount = cards.reduce((total, card) => total + card.amount, 0);

  return (
    <div className="App">
      <header className="App-header px-8">
        <section className="flex flex-col md:flex-row  md:space-x-14">
          <section className="w-full  flex items-center flex-col md:w-1/2 md:h-screen ">
            <h2 className="my-7 text-white text-2xl">--- Balance-Keeper ---</h2>
            <form className="min-h-40 space-y-8 w-full" onSubmit={onSubmit}>
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
          </section>

          <section className="w-full md:w-1/2 overflow-y-auto min-h-screen">
            <section className="mt-4 md:mt-8 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-2xl">Taken from</h2>
                <h2 className="text-center text-white">
                  Total Unpaid Amount : {formateCurrency(totalAmount)}
                </h2>
              </div>
              <div className="overflow-y-auto max-h-60 relative">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead className="sticky top-0">
                    <tr>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                        Index
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                        Title
                      </th>
                      <th className="py-2 px-4 border-b border-gray-200 bg-gray-50">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cards.map((card, index) => (
                      <tr key={index} onDoubleClick={() => removeCard(index)}>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {index + 1}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {card.title}
                        </td>
                        <td className="py-2 px-4 border-b border-gray-200 text-center">
                          {formateCurrency(card.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </section>
        </section>
      </header>
    </div>
  );
}

export default App;
