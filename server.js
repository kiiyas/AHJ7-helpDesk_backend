const http = require('http');

const Koa = require('koa');
const app = new Koa();

const TicketController = require('./modules/ticketsController');
const tickets = [];
const ticketController = new TicketController(tickets);

const koaBody = require('koa-body');
const cors = require('@koa/cors');

const port = process.env.PORT || 7070;

//
//
//

app.use(koaBody({
  urlencoded: true,
  multipart: true,
  json: true,
}));


// * middleware - обход CORS, подробно:
// app.use(async (ctx, next) => { 
//   const origin = ctx.request.get('Origin'); 
  
//   if (!origin) { 
//     return await next(); 
//   }
  
//   const headers = { 'Access-Control-Allow-Origin': '*', }; 
//   if (ctx.request.method !== 'OPTIONS') { 
//     ctx.response.set({...headers}); 
//     try { return await next(); 
//     } catch (e) { e.headers = {...e.headers, ...headers}; 
//     throw e; 
//     } 
//   }

//   if (ctx.request.get('Access-Control-Request-Method')) { 
//     ctx.response.set({ ...headers, 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH', }); 
//     if (ctx.request.get('Access-Control-Request-Headers')) { 
//       ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Allow-Request-Headers')); 
//     }
    
//     ctx.response.status = 204; // No content 
//   } 
// });

// * с пакетом @koa/cors:
app.use(cors());

app.use(async (ctx) => {
  const { method, id } = ctx.request.query;
  switch (method) {
    case 'allTickets':
      try {
        const result = ticketController.getAllTickets();
        ctx.response.body = result;
      }
      catch (err) {
        console.error(err);
      }
      return;
    case 'ticketById':
      try {
        const result = ticketController.getTicketById(id);
        ctx.response.body = result;
      }
      catch (err) {
        console.error(err);
      }
      return;
    case 'createTicket':
      try {
        const { name, description } = ctx.request.body;
        const result = ticketController.createTicket(name, description);
        ctx.response.body = result;
      }
      catch (err) {
        console.error(err);
      }
      return;
    case 'editTicket':
      try {
        const { id, name, description } = ctx.request.body;
        const result = ticketController.editTicket(id, name, description);
        ctx.response.body = result;
      }
      catch (err) {
        console.error(err);
      }
      return;
    case 'deleteTicket':
      try {
        const result = ticketController.deleteTicket(id);
        ctx.response.body = result;
      }
      catch (err) {
        console.error(err);
      }
      return;
      
    default:      
      ctx.response.status = 404;
      return;
  }
})

exports.start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Port ${port} is working...`);
    })
  }
  catch (err) {
    console.log(err);
  }
}
