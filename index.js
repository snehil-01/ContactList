const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const port=2000;
const db=require('./config/mongoose');36
const Contact=require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('assets'));

// app.use(function(req,res,next){
//     console.log("middle-ware one called");
//     next();
// });
// app.use(function(req,res,next){
//     console.log("middle-ware two called");
//     next();
// });

var contactList=[
    {
        name:"snehil",
        phone:"9301977912",
        gender:"Male"
    },
    {
        name:"Dani",
        phone:"9993646139",
        gender:"Female"
    },
    {
        name:"Ronnie",
        phone:"9893873201",
        gender:"Male"
    }

]

app.get('/delete-contact/',function(req,res){
    console.log(req.query);
    let id=req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting');
            return;
        }
        return res.redirect('/');
    });
    
});

app.get('/',function(req,res){
    console.log(__dirname);
    Contact.find({},function(err,contacts){
        if(err){
            console.log('error in fetching contacts');
            return;
        }
        return res.render('home',{
            beech:"beech is keyh and this is value",
            contact_List:contacts
    });
   
});    
})

app.get('/profile',function(req,res){
    // console.log(__dirname);
    // res.send('');

    return res.render('home',{
        contact_List:contactList
    });
})

app.post('/create-contact',function(req,res){
    
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone,
    //     gender:req.body.gender
    // })
    Contact.create({
        name:req.body.name,
        phone:req.body.phone,
        gender:req.body.gender
    },function(err,newContact){
        if(err){
            console.log('error in creating contact!');
            return;
        }
        console.log('*****',newContact);
        return res.redirect('/')
    })
    // return res.redirect('/'); 
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);
   
})


app.listen(port,function(err){
    if(err){
        console.log('error :/');
    }
    console.log('server fired succesfully on port',port);
})