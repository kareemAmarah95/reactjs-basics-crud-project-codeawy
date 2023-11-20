import { IProduct } from '../interfaces';
import { txtSlicer } from '../utils/functions';
import Image from './Image';
import Button from './ui/Button';
import CircleColor from './CircleColor';
interface IProps {
    product: IProduct
}



const ProductCard = ({ product }: IProps) => {
    const { imageURL, title, description, price, category, colors } = product;
    // render
    const renderProductColors = colors.map(color => <CircleColor key={color} color={color} />)
    return (
        <div className="max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
            <Image imageURL={imageURL} alt='product name' className='object-cover rounded-md mb-2 ' />
            <h3>{title}</h3>
            <p>{txtSlicer(description)}</p>
            <div className="flex items-center my-4 space-x-2 flex-wrap">
                {renderProductColors}
            </div>


            <div className="flex items-center justify-between">
                <span>${price}</span>
                <Image imageURL={category.imageURL} alt={category.name} className='w-10 h-10 rounded-full object-cover' />
            </div>

            <div className="flex items-center justify-between space-x-2 mt-5">
                <Button className="bg-indigo-700 hover:bg-indigo-800" width="w-full" onClick={() => console.log("clicked")}>Edit</Button>
                <Button className="bg-red-700 hover:bg-red-800" width="w-full">Delete</Button>

            </div>
        </div>
    )
}

export default ProductCard;