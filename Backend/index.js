//packeges
import path from 'path'
import express from  'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// app.use(cors({
//     origin: ['https://example.com', 'https://another-domain.com']
//   }));
  app.use(cors())
//utils
import connectDB from './config/db.js'
dotenv.config()
const port =process.env.PORT|| 5000

 connectDB();

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


// app.get('/',(res,req)=>{
// res.send("hello world 😍")
// })
//routes
import userRoutes from './routes/userRoutes.js'
import categoryRoutes from './routes/categoryRoute.js'
import productRoutes from './routes/productRoute.js'
import uploadRoutes from './routes/uploadsRoute.js'
import orderRoutes from './routes/orderRoute.js'

app.get('/',(req,res)=>{
    res.send('hello')
  })


app.use('/api/users',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/products',productRoutes)
app.use('/api/uploads',uploadRoutes)
app.use('/api/orders',orderRoutes)

app.get('/api/config/paypal',(req,res)=>{
    res.send({clientId:process.env.PAYPAL_CLIENT_ID})
})


const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname+'/uploads'))
    )




app.listen(port,()=>{
    console.log(`Server has started on port ${port} ✅`)
})