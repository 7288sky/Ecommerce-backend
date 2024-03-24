import { useState } from "react"
import {  useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,} from '../../redux/Api/categoryApiSlice'
import CategoryForm from "../../components/CategoryForm"
import Modal from "../../components/Modal"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu"
const CategoryList = () => {

    const {data:categories}=useFetchCategoriesQuery()
    const [name,setName]=useState('');
    const [selectedCategory,setSelectedCategory]=useState(null);
    const [updatingName,setUpdatingName]=useState('')
    const [modalVisible,setModalVisible]=useState(false)

    const [createCategory]=useCreateCategoryMutation();
    const [updateCategory]=useUpdateCategoryMutation();
    const [deleteCategory]=useDeleteCategoryMutation();


    const handleCreateCategory=async(e)=>{
        e.preventDefault()
        if(!name){
            toast.error('Category name is required')
            return
        }
        try {
            const result=await createCategory({name}).unwrap();

            if(result.error){
                toast.error(result.error)
            }else{
                setName('')
                console.log(result);
                toast.success(`${result?.category?.name} is created`)
            }

        } catch (error) {
            console.error(error)
            toast.error('Creating category failed,try again')
        }
    }

    const handleUpdateCategory=async(e)=>{
        e.preventDefault();
        if(!updatingName){
            toast.error('Category name is required')
        return;
        }

        try {
            const result=await updateCategory({categoryId:selectedCategory._id,updateCategory:{name:updatingName}}).unwrap();
            // console.log(result)
            if(result.error){
                toast.error(result.error)
            }else{
                toast.success(`${result.name} is updated`)
                setSelectedCategory(null)
                setUpdatingName('')
                setModalVisible(false)
            }
        } catch (error) {
            // console.log('hello')
            //✅✅ Noticable here
            toast.error(error.data.error) // Important to notive as the server is sending response of 500 so the error will be handeled here
            // console.error(error)
        }

    }

    const handleDeleteCategory=async(e)=>{
        e.preventDefault()
        try {
            const result =await deleteCategory(selectedCategory._id).unwrap()
            if(result.error){
                toast.error(result.error)
            }else{
                toast.success(`${result.name} is deleted`)
                setSelectedCategory(null)
                setModalVisible(false);
            }
        } catch (error) {
            console.error(error)
            toast.error('Category deletation failed try agin')
        }
    }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
    <AdminMenu />
    <div className="md:w-3/4 p-3">
      <div className="h-12">Manage Categories</div>
      <CategoryForm
        value={name}
        setValue={setName}
        buttonText="Submit"
        handleSubmit={handleCreateCategory}
      />
      <br />
      <hr />

      <div className="flex flex-wrap">
        {categories?.map((category) => (
          <div key={category._id}>
            <button
              className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none foucs:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              onClick={() => {
                {
                  setModalVisible(true);
                  setSelectedCategory(category);
                  setUpdatingName(category.name);
                }
              }}
            >
              {category.name}
            </button>
          </div>
        ))}
      </div>

      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <CategoryForm
          value={updatingName}
          setValue={(value) => setUpdatingName(value)}
          handleDelete={handleDeleteCategory}
          handleUpdate={handleUpdateCategory}
        />
      </Modal>
    </div>
  </div>
  )
}

export default CategoryList