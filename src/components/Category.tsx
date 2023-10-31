import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import AdminsideBar from '../page/admin/AdminsideBar'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'

import { addCategory, deleteCategory, fetchCategory, updateCategory } from '../redux/slices/category/categorySlice'

export default function Category() {
  const { categories, isLoading, error } = useSelector((state: RootState) => state.categoriesR)
  const [categoryName, setcategoryName] = useState('')
  const [isEdit, setEdit] = useState(false)
  const [selctedCategoryId, setSelctedCategoryId] = useState(0)

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

  // here is where delete  category
  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id))
  }
  const handlechange = (event: ChangeEvent<HTMLInputElement>) => {
    setcategoryName(event.target.value)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // get the id and the name of the category
    if (!isEdit) {
      const newCategory = { id: new Date().getTime(), name: categoryName }
      dispatch(addCategory(newCategory))
    }else{
      const updateCategoryData = {  id:selctedCategoryId ,name: categoryName }
      dispatch(updateCategory(updateCategoryData))

    }
    setcategoryName('')
  }
  const handleEdit = (id: number, name: string) => {
    setSelctedCategoryId(id)
    setEdit(true)
    setcategoryName(name)
  }
  return (
    <div>
      <div className="container-category">
        <AdminsideBar />
        <div className="main-content">
          <div>
            <h3>Create a category</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="category"
                value={categoryName}
                placeholder="Enter category name"
                onChange={handlechange}
              />
              <button>{isEdit ? 'Update' : 'Create'}</button>
            </form>
          </div>
          <section className="category-main">
            {categories &&
              categories.map((Category) => {
                return (
                  <article key={Category.id} className='category' >
                    <h3>{Category.name}</h3>
                    <button onClick={() => handleEdit(Category.id, Category.name)}>Edit</button>
                    <button
                      onClick={() => {
                        handleDelete(Category.id)
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
