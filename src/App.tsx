import React, {useState} from 'react'
import s from './App.module.css'

interface IProducts {
    id: number
    name: string
    price: number
    description: string
    discountedPrice: number
}

function App() {
    const [products, setProducts] = useState<IProducts[]>([
        {
            'id':3,
            'name':'Cake',
            'price':333,
            'description':'The tastiest cake in the world.',
            'discountedPrice': 0,
        },
        {
            'id':5,
            'name':'Petroleum',
            'price':2977,
            'description':'Black gold.',
            'discountedPrice': 0,
        },
        {
            'id':8,
            'name':'Moscow metro logo',
            'price':117000000,
            'description':'Remove circle from logo',
            'discountedPrice': 0,
        }
    ])

    const [productId, setProductId] = useState(0)
    const [productPrice, setProductPrice] = useState(0)

    const [discountProductId, setDiscountProductId] = useState(0)
    const [percentage, setPercentage] = useState(0)

    const [findProductId, setFindProductId] = useState(0)
    const [foundProduct, setFoundProduct] = useState([{}])

    const [newProductId, setNewProductId] = useState(0)
    const [newProductName, setNewProductName] = useState('')
    const [newProductPrice, setNewProductPrice] = useState(0)
    const [newProductDescription, setNewProductDescription] = useState('')

    const returnProduct = (productId: number) => {
        const product = products.filter(obj => Number(obj.id) === productId)
        setFoundProduct(product)
        return product
    }

    const returnAnotherProducts = (productId: number) => {
        return products.filter(obj => Number(obj.id) !== productId)
    }

    const updatePriceHandler = () => {
        const product = returnProduct(productId)
        const anotherProducts = returnAnotherProducts(productId)

        product[0].price = productPrice
        setProducts([...product, ...anotherProducts])
    }

    const getDiscountPriceHandler = () => {
        const product = returnProduct(discountProductId)
        const anotherProducts = returnAnotherProducts(discountProductId)

        product[0].discountedPrice = product[0].price - (product[0].price * (percentage / 100))

        setProducts([...product, ...anotherProducts])
    }

    const addProductHandler = () => {
        setProducts(
            prevState => [
                ...prevState,
                {
                    id: newProductId,
                    name: newProductName,
                    price: +newProductPrice,
                    description: newProductDescription,
                    discountedPrice: 0
                }
            ]
        )
    }

  return (
    <div className={s.App}>
        <br/>
        <div style={{maxWidth: '1200px', whiteSpace: 'pre'}}>{JSON.stringify(products, null, '\t')}</div>
        <br/>
        <div className={s.block}>
            <h4>set new price</h4>
            <label htmlFor="id">type product id here</label>
            <input type="text" id="id" onChange={e => setProductId(+e.target.value)}/>
            <label htmlFor="price">type price here</label>
            <input type="text" id="price" onChange={e => setProductPrice(+e.target.value)}/>
            <button onClick={updatePriceHandler}>update price</button>
        </div>
        <div className={s.block}>
            <h4>set discount to product</h4>
            <label htmlFor="discountId">type product id here</label>
            <input type="text" id="discountId" onChange={e => setDiscountProductId(+e.target.value)}/>
            <label htmlFor="discount">type discount percentage here</label>
            <input type="text" id="discount" onChange={e => setPercentage(+e.target.value)}/>
            <button onClick={getDiscountPriceHandler}>update discounted price</button>
        </div>
        <div className={s.block}>
            <h4>get product by id</h4>
            <label htmlFor="findId">type id here</label>
            <input type="text" id="findId" onChange={e => setFindProductId(+e.target.value)}/>
            <button onClick={() => returnProduct(findProductId)}>get</button>
            <div  style={{maxWidth: '500px', whiteSpace: 'pre'}}>{JSON.stringify(foundProduct, null, '\t')}</div>
        </div>
        <div className={s.block}>
            <h4>add new product</h4>
            <label htmlFor="productNewId">type product id here</label>
            <textarea id="productNewId" onChange={e => setNewProductId(+e.target.value)}/>
            <label htmlFor="productNewName">type product name here</label>
            <textarea id="productNewName" onChange={e => setNewProductName(e.target.value)}/>
            <label htmlFor="productNewDesc">type product description here</label>
            <textarea id="productNewDesc" onChange={e => setNewProductDescription(e.target.value)}/>
            <label htmlFor="productNewPrice">type product price here</label>
            <textarea id="productNewPrice" onChange={e => setNewProductPrice(+e.target.value)}/>
            <button onClick={addProductHandler}>add new product</button>
        </div>
    </div>
  )
}

export default App
