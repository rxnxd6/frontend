import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import AdminsideBar from '../page/admin/AdminsideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { deleteOrder, fetchOrder } from '../redux/slices/orders/OrdersSlice'

export default function Category() {
  const { orders, isLoading, error } = useSelector((state: RootState) => state.orderR)
  // const [categoryName, setcategoryName] = useState('')
  // const [isEdit, setEdit] = useState(false)
  // const [selctedCategoryId, setSelctedCategoryId] = useState(0)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchOrder())
  }, [])

  if (isLoading) {
    return <p>loding ....</p>
  }
  if (error) {
    return <p>{error}</p>
  }

  // here is where delete  category
  const handleDelete = (id: number) => {
    dispatch(deleteOrder(id))
  }

  return (
    <div>
      <div className="container-category">
        <AdminsideBar />
        <div className="main-content">
          <section>
            {orders.length > 0 &&
              orders.map((order) => {
                return (
                  <article key={order.id} className="product-list-order">
                    <p>Order Id:{order.id}</p>
                    <p>Product Id:{order.productId}</p>
                    <p>purchased At:{order.purchasedAt}</p>
                    <p>user Id:{order.userId}</p>

                    <button
                      onClick={() => {
                        handleDelete(order.id)
                      }}>
                      Delete
                    </button>
                  </article>
                )
              })}
          </section>
        </div>
      </div>
    </div>
  )
}
