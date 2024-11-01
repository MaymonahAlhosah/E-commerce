import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import {TbTrash} from "react-icons/tb"

const CartItems = () => {

    const { getTotalCartAmount, all_products, cartItems, removeFromCart } = useContext(ShopContext);

    return (
        <section className='max_padd_container pt-28'> 
            <table className='w-full mx-auto'>
                <thead>
                    <tr className='bg-slate-900/10 regular-18 sm:regular-22 text-start py-12'>
                        <th className='p-1 py-2'>المنتجات</th>
                        <th className='p-1 py-2'>وصف المنتج</th>
                        <th className='p-1 py-2'>السعر</th>
                        <th className='p-1 py-2'>الكمية</th>
                        <th className='p-1 py-2'>المجموع</th>
                        <th className='p-1 py-2'>حذف المنتج</th>
                    </tr>
                </thead>
                <tbody>
                    {all_products.map((e) => {
                        if (cartItems[e.id] > 0) {
                            return <tr key={e.id} className='border-b border-slate-900/20 text-gray-30 p-6 medium-14 text-center'>
                                <td className='flexCenter'><img src={e.image} alt="prdctImg" height={43} width={43} className='rounded-lg ring-1 ring-slate-900/5 my-1'/></td>
                                <td><div className='line-clamp-3'>{e.name}</div></td>
                                <td>${e.new_price}</td>
                                <td className='w-16 h-16 bg-white'>{cartItems[e.id]}</td>
                                <td>${e.new_price * cartItems[e.id]}</td>
                                <td>
                                    <div className='bold-22 pl-14'><TbTrash onClick={()=> removeFromCart(e.id)}/></div>
                                </td>
                            </tr>
                        }
                        return null;
                    })}
                </tbody>
            </table>
            {/* cart details */}
            <div className='flex flex-col gap-20 my-16 p-8 md:flex-row rounded-md bg-white w-full max-w-[666px]'>
                <div className='flex flex-col gap-10'>
                    <h4 className='bold-20'>ملخص المشتريات</h4>
                    <div>
                        <div className='flexBetween py-4'>
                            <h4 className='medium-16'>:قيمة المشتريات</h4>
                            <h4 className='text-gray-30 font-semibold'>${getTotalCartAmount()}</h4>
                        </div>
                        <hr />
                        <div className='flexBetween py-4'>
                            <h4 className='medium-16'>:رسوم الشحن</h4>
                            <h4 className='text-gray-30 font-semibold'>Free</h4>
                        </div>
                        <hr />
                        <div className='flexBetween py-4'>
                            <h4 className='bold-18'>:المجموع</h4>
                            <h4 className='bold-18'>${getTotalCartAmount()}</h4>
                        </div>
                    </div>
                    <button className='btn_dark_rounded w-44'>اكمال الدفع</button>
                    <div className='flex flex-col gap-10 '>
                        <h4 className='bold-20 capitalize'>:رمز القسيمة الخاص بك أدخل هنا</h4>
                        <div className='flexBetween pl-5 h-12 bg-primary rounded-full ring-1 ring-slate-900/10'>
                            <input type="text" placeholder='كود الخصم' className='bg-transparent border-none outline-none'/>
                            <button className='btn_dark_rounded'>تحقق</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CartItems