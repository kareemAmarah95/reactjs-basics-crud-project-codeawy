import ProductCard from "./components/ProductCard"
import { formInputsList, productList } from './data/index';
import Modal from './components/ui/Modal';
import { useState } from 'react';
import Button from './components/ui/Button';
import Input from './components/ui/Input';


const App = () => {

  // state
  const [isOpen, setIsOpen] = useState(false)

  // handler

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  const renderProducts = productList.map(product => <ProductCard key={product.id} product={product} />);
  const renderFormInput = formInputsList.map(input => <div className="flex flex-col">
    <label className="mb-[1px] text-sm font-medium text-gray-700" htmlFor={input.id}>{input.label}</label>
    <Input type="text" id={input.id} name={input.name} />
  </div>);
  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800  w-full" onClick={openModal}>Add Product</Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProducts}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT">
        <form className="space-y-3">
          {renderFormInput}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800  w-full">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500 w-full">Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App