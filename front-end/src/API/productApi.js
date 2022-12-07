import axios from "axios"

const getAllProductApi = async () =>{
    try{
        const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + "/products")
        // console.log(response)
        return response.data
    } catch (e){
        return {success:false,error:e}
    }
}

const getAllProductLine = async () => {
    try{
        const response = await axios.get(process.env.REACT_APP_API_ENDPOINT + "/product-lines")
        // console.log(response)
        return response.data
    } catch (e){
        return {success:false,error:e}
    }
}

const createProduct = async (data) =>{
    try{
        const response = await axios.post(process.env.REACT_APP_API_ENDPOINT + "/products/create",
        data
        )
        console.log(response)
        return response.data
    } catch (e){
        return {success:false,error:e}
    }
}

export {
    getAllProductApi,
    getAllProductLine,
    createProduct,
}