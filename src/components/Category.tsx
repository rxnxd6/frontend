import React, { useEffect } from 'react'
import AdminsideBar from './AdminsideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { fetchCategory } from '../redux/slices/category/categorySlice'

export default function Category() {
  const { Category, isLoading, error } = useSelector((state: RootState) => state.categoriesR)

  const dispatch: AppDispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategory())
  }, [])

  if (isLoading) {
    return <p>loding ....</p>
  }
  if (error) {
    return <p>{error}</p>
  }
  return (
    <div>
      <div className="container">
        <AdminsideBar />
        <div className="main-content">

        <h2>List of Category</h2>
        <section >
          {Category.length > 0 &&
            Category.map((Category) => {
              return (
                <article key={Category.id} className="product">
                  <h3>{Category.name}</h3>

                  <button>Edit</button>
                  <button>Delete</button>
                </article>
              )
            })}
        </section>

        </div>
        
      </div>
    </div>
  )
}
