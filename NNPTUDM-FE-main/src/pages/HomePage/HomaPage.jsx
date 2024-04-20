import React from "react";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from "./style";
import SlideComponent from "../../components/SlideComponent/SlideComponent";
import slider1 from '../../assets/images/slide1.webp'
import slider2 from '../../assets/images/slide2.webp'
import slider3 from '../../assets/images/slide3.webp'
import CardComponent from "../../components/CardComponent/CardComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from '../../service/ProductService'
import { useDebounce } from '../../hooks/useDebounce'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'


const HomePage = () =>{
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading, setLoading] = useState(false)
    const [limit, setLimit] = useState(6)
    const [typeProducts, setTypeProducts] = useState([])
    const arr = []
    const fetchProductAll = async (context) =>{
        const limit = context?.queryKey && context?.queryKey[1]
        const search = context?.queryKey && context?.queryKey[2]
        const res = await ProductService.getAllProduct(search, limit)
    
        return res
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct()
        if(res?.status === 'OK') {
          setTypeProducts(res?.data)
        }
      }
    
      const { isLoading, data: products, isPreviousData } = useQuery(['products', limit, searchDebounce], fetchProductAll, { retry: 3, retryDelay: 1000, keepPreviousData: true })
    
      useEffect(() => {
        fetchAllTypeProduct()
      }, [])
    console.log('data', products)
    return(
        <>
        <div style={{padding: '0 120px', margin: '0 auto'}}>
            <WrapperTypeProduct>
                {arr.map((item) =>{
                return (
                    <TypeProduct name={item} key={item}/>
                )
                })}
            </WrapperTypeProduct>
        </div>
        <div className='body' style={{ width: '100%', backgroundColor: '#efefef', }}>
            <div id="container" style={{ height: '1000px', width: '1270px', margin: '0 auto' }}> 
                <SlideComponent arrImages = {[slider3]}/>
                <WrapperProducts>
                    {products?.data?.map((product) =>{
                        return(
                            <CardComponent 
                                key={product._id} 
                                countInStock={product.countInStock} 
                                description={product.description} 
                                image={product.image} 
                                name={product.name}
                                price={product.price}
                                rating={product.rating}
                                type={product.type}
                                />
                        )
                    })}
                </WrapperProducts>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                    <WrapperButtonMore textbutton="Xem thêm" type="outline" styleButton={{
                        border: '1px solid #ee4d2d', color: '#ee4d2d',
                        width: '240px', height: '38px', borderRadius: '20px'
                    }}
                    styleTextButton={{fontWeight: 500}}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomePage