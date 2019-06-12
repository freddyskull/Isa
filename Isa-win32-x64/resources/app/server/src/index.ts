import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

//importaciones de las rutas de mi api ************ */
import indexRoutes from './routes/indexRoutes';
import productRoutes from './routes/productRoutes';
import providerRoutes from './routes/providerRoutes';
import clientRoutes from './routes/clientRoutes';
import categoryRoutes from './routes/categoryRoutes';
import userRoutes from './routes/userRoutes';
import ventasRoutes from './routes/ventasRoutes'; 
import ventasPendRoutes from './routes/ventsPendRoutes'; 
import permissRoutes from './routes/permissRoutes'; 
import  priceUsdRoutes from './routes/priceUsdRoutes';
//************************************************* */

// servidor apiRest

class Server {

  public  app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    
    config(): void{
        this.app.set('port',process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));    
    }
    routes(): void{
        this.app.use(indexRoutes);
        this.app.use('/api/product/',productRoutes);
        this.app.use('/api/provider/',providerRoutes);
        this.app.use('/api/client/',clientRoutes);
        this.app.use('/api/category/',categoryRoutes);
        this.app.use('/api/pendientes',ventasPendRoutes);
        this.app.use('/private/users/',userRoutes);
        this.app.use('/private/ventas',ventasRoutes);
        this.app.use('/private/permiss',permissRoutes);
        this.app.use('/api/usdvalor', priceUsdRoutes);
    }
    start(): void {
        this.app.listen(this.app.get('port'), () =>{
            console.log('server en puerto', this.app.get('port'))
        });
    }
}

const server = new Server ();
server.start();

//************************************************************************************************************ */


// const nodemailer = require("nodemailer");

// async function main(){

//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass // generated ethereal password
//     }
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "freddyskull11@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>" // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);


//************************************************************************************************************ */