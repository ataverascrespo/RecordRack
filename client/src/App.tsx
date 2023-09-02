const products = [
  { name: 'product1', price: 100.00 },
  { name: 'product2', price: 200.00 },
  { name: 'product2', price: 200.00 },
]


function App() {
  const [products, setProducts]
  return (
    <div>
      <h1 className="text-3xl text-red-400">Record Rack</h1>
      <ul className="list-disc">
        {products.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
