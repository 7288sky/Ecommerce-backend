import { useEffect, useState } from "react"
import { useNavigate,useParams } from "react-router"
import { useGetProductByIdQuery,useUploadProductImageMutation ,
  useUpdateProductMutation
} from "../../redux/Api/productApiSlice"
import { useFetchCategoriesQuery,useUpdateCategoryMutation,useDeleteCategoryMutation } from "../../redux/Api/categoryApiSlice"
import {toast} from 'react-toastify'
import { useDeleteProductMutation } from "../../redux/Api/productApiSlice"

import AdminMenu from "./AdminMenu"

function ProductUpdate() {

const params=useParams();
const {data:productData}=useGetProductByIdQuery(params?.id)

//countInStock

const [image,setImage]=useState(productData?.image|| "")
const [name,setName]=useState(productData?.name|| "")
const [description,setDescription]=useState(productData?.description|| '')
const [price,setPrice]=useState(productData?.price||'')
const [category,setCategory]=useState(productData?.category||'')
const [brand,setBrand]=useState(productData?.brand||'')
const [stock,setStock]=useState(productData?.countInStock||0)
const [quantity,setQuantity]=useState(productData?.quantity||'')
const navigate=useNavigate()

const {data:categories=[]}=useFetchCategoriesQuery()
console.log(image)

const [uploadProductImage]=useUploadProductImageMutation()

const [updateProduct]=useUpdateProductMutation()

const [deleteProduct]=useDeleteProductMutation()

useEffect(()=>{
  if(productData&&productData?._id){
    setName(productData?.name)
    setDescription(productData?.description)
    setPrice(productData?.price)
    setCategory(productData?.category?._id)
    setQuantity(productData?.quantity)
    setBrand(productData?.brand)
    setImage(productData?.image)
    setStock(productData?.countInStock)
  }
},[productData]);


const handleSubmit=async()=>{
  try {
    //👽👽👽Here we have error if we do not select category(or use default selected category) it will show error because the category will be set Onchange event
    //// now it is solved just by adding a <option value="">Select</option> this 
    const formData=new FormData()
    formData.append('image',image)
    formData.append('name',name)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('category',category)
    formData.append('quantity',quantity)
    formData.append('brand',brand)
    formData.append('countInStock',stock)

    const {data}=await updateProduct({productId:params.id,formData})
    if(data?.error){
      console.log(data.error)
    toast.error(data.error)
    
    }else{
      toast.success(`Product successfully updated`)
      navigate('/admin/allproductslist')
    }


  } catch (error) {
    console.error(error)
    toast.error('Product update failed Try Again')
  }
}

const handleDelete=async()=>{
  try {
    let answer=window.confirm("Are you sure to delete this product")
    if(!answer) return;
    const {data}=await deleteProduct(params.id)
    toast.success(`${data.name} is successfully deleted`)
    navigate('/admin/allproductslist')
  } catch (error) {
    console.log(error)
    toast.error("Delete failed try again latter")
  }
}


const uploadFileHandler=async(e)=>{
const formData=new FormData();
formData.append('image',e.target.files[0]);
try {
  const res=await uploadProductImage(formData).unwrap()
  toast.success("Item added successfully")
  setImage(res.image)
} catch (error) {
  toast.error("Item is not added")
}
}

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Create Product</div>

        {image && (
          <div className="text-center">
            <img
              src={image}
              alt="product"
              className="block mx-auto max-h-[200px]"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="border text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
            {image ? image.name : "Upload Image"}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "text-white"}
            />
          </label>
        </div>

        <div className="p-3">
          <div className="flex flex-wrap">
            <div className="one">
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="two ml-10 ">
              <label htmlFor="name block">Price</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="one">
              <label htmlFor="name block">Quantity</label> <br />
              <input
                type="number"
                className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="two ml-10 ">
              <label htmlFor="name block">Brand</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
            </div>
          </div>

          <label htmlFor="" className="my-5">
            Description
          </label>
          <textarea
            type="text"
            className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex justify-between">
            <div>
              <label htmlFor="name block">Count In Stock</label> <br />
              <input
                type="text"
                className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="">Category</label> <br />
              <select
                placeholder="Choose Category"
                className="p-4 mb-3 w-[25rem] border rounded-lg bg-[#101011] text-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
              <option value="">Select</option>
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
                >
                  Delete
                </button>
              </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ProductUpdate