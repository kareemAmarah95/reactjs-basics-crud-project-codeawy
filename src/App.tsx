import ProductCard from "./components/ProductCard";
import { formInputsList, productList, colors, categories } from './data/index';
import Modal from './components/ui/Modal';
import { ChangeEvent, FormEvent, useState } from 'react';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import { IProduct } from './interfaces';
import { productValidation } from "./validation";
import ErrorMessage from './components/ErrorMessage';
import CircleColor from './components/CircleColor';
import { v4 as uuid } from "uuid";
import Select from './components/ui/Select';
import { TProductName } from "./types";




const App = () => {

  const defaultProductObj = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  }
  const [products, setProducts] = useState<IProduct[]>(productList)
  const [product, setProduct] = useState<IProduct>(defaultProductObj)
  const [productToEdit, setProductToEdit] = useState<IProduct>(defaultProductObj)
  // state
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
  });
  const [tempColors, setTempColors] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  console.log('product To Edit', productToEdit)
  // handler

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeEditModal() {
    setIsOpenEditModal(false)
  }

  function openEditModal() {
    setIsOpenEditModal(true)
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    })

  }
  const onChangeEditHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setProductToEdit({
      ...productToEdit,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: ""
    })

  }

  const onCancel = () => {
    console.log('cancel');
    setProduct(defaultProductObj);
    setIsOpen(false)
  }


  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = product;
    const errors = productValidation({
      title: title,
      description: description,
      imageURL: imageURL,
      price: price
    })
    // console.log(errors);
    // check if any property has a value of "" && check if all properties have a value of ""
    const hasErrorMsg = Object.values(errors).some(value => value === '') && Object.values(errors).every(value => value === '');
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }


    setProducts(prev => [{ ...product, id: uuid(), colors: tempColors, category: selectedCategory }, ...prev])
    setProduct(defaultProductObj);
    setTempColors([]);
    closeModal();
  }

  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = productToEdit;
    const errors = productValidation({
      title: title,
      description: description,
      imageURL: imageURL,
      price: price
    })
    // console.log(errors);
    // check if any property has a value of "" && check if all properties have a value of ""
    const hasErrorMsg = Object.values(errors).some(value => value === '') && Object.values(errors).every(value => value === '');
    if (!hasErrorMsg) {
      setErrors(errors);
      return;
    }

    setProductToEdit(defaultProductObj);
    setTempColors([]);
    closeModal();
  }

  // render
  const renderProducts = products.map(product => <ProductCard key={product.id} product={product} setProductToEdit={setProductToEdit} openEditModal={openEditModal} />);
  const renderFormInput = formInputsList.map(input => (
    <div className="flex flex-col" key={input.id}>
      <label className="mb-[1px] text-sm font-medium text-gray-700" htmlFor={input.id}>{input.label}</label>
      <Input type="text" id={input.id} name={input.name} value={product[input.name]} onChange={onChangeHandler} />
      <ErrorMessage message={errors[input.name]} />
    </div>));

  const renderProductColors = colors.map(color => <CircleColor key={color} color={color} onClick={() => {
    if (tempColors.includes(color)) {
      setTempColors(prev => prev.filter(item => item !== color))
      return;
    }
    setTempColors((prev) => [...prev, color])
  }} />)

  const renderProductEditWithErrorMsg = (id: string, label: string, name: TProductName) => {
    return (
      <div className="flex flex-col">
        <label className="mb-[1px] text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>
        <Input type="text" id={id} name={name} value={productToEdit[name]} onChange={onChangeEditHandler} />
        <ErrorMessage message={errors[name]} />
      </div>
    )
  }

  return (
    <main className="container">
      <Button className="bg-indigo-700 hover:bg-indigo-800  w-full" onClick={openModal}>Add Product</Button>

      <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {renderProducts}
      </div>


      {/* ADD PRODUCT MODAL */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD A NEW PRODUCT" >
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInput}
          <Select selected={selectedCategory} setSelected={setSelectedCategory} />
          <div className="flex items-center my-4 space-x-2 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex justify-start items-center ml-2 my-4 space-x-2 flex-wrap">
            {tempColors.map(color => <span style={{ backgroundColor: color }} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" key={color}>{color}</span>)}
          </div>



          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800  w-full">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500 w-full" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>


      {/* EDIT PRODUCT MODAL */}
      <Modal isOpen={isOpenEditModal} closeModal={closeEditModal} title="EDIT THIS PRODUCT" >
        <form className="space-y-3" onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg('title', 'Product Title', 'title')}
          {renderProductEditWithErrorMsg('description', 'Product Description', 'description')}
          {renderProductEditWithErrorMsg('imageURL', 'Product Image URL', 'imageURL')}
          {renderProductEditWithErrorMsg('price', 'Product Price', 'price')}
          {/* {renderFormInput} */}
          {/* <Select selected={selectedCategory} setSelected={setSelectedCategory} /> */}
          <div className="flex items-center my-4 space-x-2 flex-wrap">
            {renderProductColors}
          </div>
          <div className="flex justify-start items-center ml-2 my-4 space-x-2 flex-wrap">
            {tempColors.map(color => <span style={{ backgroundColor: color }} className="p-1 mr-1 mb-1 text-xs rounded-md text-white" key={color}>{color}</span>)}
          </div>



          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 hover:bg-indigo-800  w-full">Submit</Button>
            <Button className="bg-gray-400 hover:bg-gray-500 w-full" onClick={onCancel}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App