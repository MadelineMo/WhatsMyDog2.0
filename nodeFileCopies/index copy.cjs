//import { query } from './query.js'
//https://www.digitalocean.com/community/tutorials/nodejs-uploading-files-multer-express
//https://dev.to/austinbrownopspark/how-to-upload-and-serve-photos-using-react-node-express-36ii
//https://medium.com/swlh/how-to-upload-image-using-multer-in-node-js-f3aeffb90657
var express = require('express')
var multer  = require('multer')
const fs = require('fs');
var port = 3000;

var app = express()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

async function query(filename) {
  const data = fs.readFileSync(filename);
  const response = await fetch(
      "https://...",
      {
          headers: { Authorization: `Bearer ...` },
          method: "POST",
          body: data,
      }
  );
  const result = await response.json();
  return result;
}

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.use('/home',express.static(__dirname + '/WhatsMyDog2.0'));
app.use('/uploads', express.static('uploads'));

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


app.post('/dog-upload', upload.single('profile-file'), function (req, res, next) {
  // upload image to dog AI and get Label number
  var returned = query('./uploads/'+req.file.filename).then((response) => {
    console.log(JSON.stringify(response))
    first = response[0]
    string = JSON.stringify(first)
    // if huggingface returns error... return error
    //console.log(string.indexOf("error") > -1)
    //if(string.indexOf("error") > -1){
      //result = "error"
    //}else{
      result = first["label"]
      result = result.replace('"', '')
      console.log(result)
    //}
    // return label number or error
    return JSON.stringify(result)
  });
  // dealing with promise variable
  // need to get name out of the promise 
  const label = Promise.resolve(returned)
  let x;
  const name = label.then((value)=> {
    var name = labelToName(value.replaceAll('"', ''))
    x = name
    console.log("name:",name)
    return name
    });
  // wait 1 second to get promise value then proceed to return
  delay(2000).then(() => { //https://masteringjs.io/tutorials/fundamentals/wait-1-second-then
    console.log("delay 1 second")
    console.log(name)
    let sentence = `My name is ${ x }. Nice to meet you.`
    console.log(sentence)
    var response = `<!DOCTYPE html>`
    response += `<html>`
    response += `<head style="margin:0px auto;">`
		response += `<meta charset="UTF-8">`
		response += `<title>Whats My Dog?</title>`
		response += `<div class="topnav" style="padding:20px;margin-top:30px;background-color:#1e1e1e;height:35px;margin:0px auto;position:center;">`
    response += `<a class="active" href="/home" style="text-align: center;font-size: 30px;text-decoration: none;color: #fff;">Home</a>`
    response += `</div>`
    response += `</head>`
    response += `<body style="margin:0px;position:center;">`
    response += `<br>`
    response += `<h1 style="text-align: center;">Dog Photo Analyzed:</h1>`
    response += `<br>`
    response += `<img class="newDog" src="${req.file.path}" style="margin:0px auto;width:50%;padding-left:25%;">`
    response += `<br>`
    response += `<p style="text-align: center; font-size:30px; margin: 0px;padding-top: 20px;">I am a ${ x }.<p>`
    response += `<p style="text-align: center; font-size:30px; margin: 0px;">Nice to meet you!<p>`
    response += `</body>`
    response += `</html>`
    return res.send(response)
  });
}) 


app.listen(port,() => console.log(`Server running on http://localhost:${port}/home`))
// all labels to dog names
function labelToName(label) {
  var dogName = "Error"
  if(label=="LABEL_0"){
    dogName = "Chihuahua"
  }else if(label=="LABEL_1"){
    dogName = "Japanese Spaniel"
  }else if(label=="LABEL_2"){
    dogName = "Maltese"
  }else if(label=="LABEL_3"){
    dogName = "Pekinese"
  }else if(label=="LABEL_4"){
    dogName = "Shih-Tzu"
  }else if(label=="LABEL_5"){
    dogName = "Blenheim Spaniel"
  }else if(label=="LABEL_6"){
    dogName = "Papillon"
  }else if(label=="LABEL_7"){
    dogName = "Toy Terrier"
  }else if(label=="LABEL_8"){
    dogName = "Rhodesian Ridgeback"
  }else if(label=="LABEL_9"){
    dogName = "Afghan Hound"
  }else if(label=="LABEL_10"){
    dogName = "Basset"
  }else if(label=="LABEL_11"){
    dogName = "Beagle"
  }else if(label=="LABEL_12"){
    dogName = "Bloodhound"
  }else if(label=="LABEL_13"){
    dogName = "Bluetick"
  }else if(label=="LABEL_14"){
    dogName = "Black-and-Tan Coonhound"
  }else if(label=="LABEL_15"){
    dogName = "Walker Hound"
  }else if(label=="LABEL_16"){
    dogName = "English Foxhound"
  }else if(label=="LABEL_17"){
    dogName = "Redbone"
  }else if(label=="LABEL_18"){
    dogName = "Borzoi"
  }else if(label=="LABEL_19"){
    dogName = "Irish Wolfhound"
  }else if(label=="LABEL_20"){
    dogName = "Italian Greyhound"
  }else if(label=="LABEL_21"){
    dogName = "Whippet"
  }else if(label=="LABEL_22"){
    dogName = "Ibizan Hound"
  }else if(label=="LABEL_23"){
    dogName = "Norwegian Elkhound"
  }else if(label=="LABEL_24"){
    dogName = "Otterhound"
  }else if(label=="LABEL_25"){
    dogName = "Saluki"
  }else if(label=="LABEL_26"){
    dogName = "Scottish Deerhound"
  }else if(label=="LABEL_27"){
    dogName = "Weimaraner"
  }else if(label=="LABEL_28"){
    dogName = "Staffordshire Bullterrier"
  }else if(label=="LABEL_29"){
    dogName = "American Terrier"
  }else if(label=="LABEL_30"){
    dogName = "Bedlington Terrier"
  }else if(label=="LABEL_31"){
    dogName = "Border Terrier"
  }else if(label=="LABEL_32"){
    dogName = "Kerry Blue Terrier"
  }else if(label=="LABEL_33"){
    dogName = "Irish Terrier"
  }else if(label=="LABEL_34"){
    dogName = "Norfolk Terrier"
  }else if(label=="LABEL_35"){
    dogName = "Norwich Terrier"
  }else if(label=="LABEL_36"){
    dogName = "Yorkshire Terrier"
  }else if(label=="LABEL_37"){
    dogName = "Wire-Haired Fox Terrier"
  }else if(label=="LABEL_38"){
    dogName = "Lakeland Terrier"
  }else if(label=="LABEL_39"){
    dogName = "Sealyham Terrier"
  }else if(label=="LABEL_40"){
    dogName = "Airedale"
  }else if(label=="LABEL_41"){
    dogName = "Cairn"
  }else if(label=="LABEL_42"){
    dogName = "Australian Terrier"
  }else if(label=="LABEL_43"){
    dogName = "Dandie Dinmont"
  }else if(label=="LABEL_44"){
    dogName = "Boston Bull"
  }else if(label=="LABEL_45"){
    dogName = "Miniature Schnauzer"
  }else if(label=="LABEL_46"){
    dogName = "Giant Schnauzer"
  }else if(label=="LABEL_47"){
    dogName = "Standard Schnauzer"
  }else if(label=="LABEL_48"){
    dogName = "Scotch Terrier"
  }else if(label=="LABEL_49"){
    dogName = "Tibetan Terrier"
  }else if(label=="LABEL_50"){
    dogName = "Silky Terrier"
  }else if(label=="LABEL_51"){
    dogName = "Soft-Coated Wheaten Terrier"
  }else if(label=="LABEL_52"){
    dogName = "West Highland White Terrier"
  }else if(label=="LABEL_53"){
    dogName = "Lhasa"
  }else if(label=="LABEL_54"){
    dogName = "Flat-Coated Retriever"
  }else if(label=="LABEL_55"){
    dogName = "Curly-Coated Retriever"
  }else if(label=="LABEL_56"){
    dogName = "Golden Retriever"
  }else if(label=="LABEL_57"){
    dogName = "Labrador Retriever"
  }else if(label=="LABEL_58"){
    dogName = "Chesapeak Bay Retriever"
  }else if(label=="LABEL_59"){
    dogName = "German Short-Haired Pointer"
  }else if(label=="LABEL_60"){
    dogName = "Vizsla"
  }else if(label=="LABEL_61"){
    dogName = "English Setter"
  }else if(label=="LABEL_62"){
    dogName = "Irish Setter"
  }else if(label=="LABEL_63"){
    dogName = "Gordon Setter"
  }else if(label=="LABEL_64"){
    dogName = "Britany Spaniel"
  }else if(label=="LABEL_65"){
    dogName = "Clumber"
  }else if(label=="LABEL_66"){
    dogName = "English Springer"
  }else if(label=="LABEL_67"){
    dogName = "Welsh Springer Spaniel"
  }else if(label=="LABEL_68"){
    dogName = "Cocker Spaniel"
  }else if(label=="LABEL_69"){
    dogName = "Sussex Spaniel"
  }else if(label=="LABEL_70"){
    dogName = "Irish Water Spaniel"
  }else if(label=="LABEL_71"){
    dogName = "Kuvasz"
  }else if(label=="LABEL_72"){
    dogName = "Schipperke"
  }else if(label=="LABEL_73"){
    dogName = "Groenendael"
  }else if(label=="LABEL_74"){
    dogName = "Malinois"
  }else if(label=="LABEL_75"){
    dogName = "Briard"
  }else if(label=="LABEL_76"){
    dogName = "Kelpie"
  }else if(label=="LABEL_77"){
    dogName = "Komondor"
  }else if(label=="LABEL_78"){
    dogName = "Old English Sheepdog"
  }else if(label=="LABEL_79"){
    dogName = "Shetland Sheepdog"
  }else if(label=="LABEL_80"){
    dogName = "Collie"
  }else if(label=="LABEL_81"){
    dogName = "Border Collie"
  }else if(label=="LABEL_82"){
    dogName = "Bouvier Des Flandres"
  }else if(label=="LABEL_83"){
    dogName = "Rottweiler"
  }else if(label=="LABEL_84"){
    dogName = "German Shepherd"
  }else if(label=="LABEL_85"){
    dogName = "Doberman"
  }else if(label=="LABEL_86"){
    dogName = "Miniature Pinscher"
  }else if(label=="LABEL_87"){
    dogName = "Great Swiss Mountain Dog"
  }else if(label=="LABEL_88"){
    dogName = "Bernese Mountain Dog"
  }else if(label=="LABEL_89"){
    dogName = "Appenzeller"
  }else if(label=="LABEL_90"){
    dogName = "EntleBucher"
  }else if(label=="LABEL_91"){
    dogName = "Boxer"
  }else if(label=="LABEL_92"){
    dogName = "Bull Mastiff"
  }else if(label=="LABEL_93"){
    dogName = "Tibetan Mastiff"
  }else if(label=="LABEL_94"){
    dogName = "French Bulldog"
  }else if(label=="LABEL_95"){
    dogName = "Great Dane"
  }else if(label=="LABEL_96"){
    dogName = "Saint Bernard"
  }else if(label=="LABEL_97"){
    dogName = "Eskimo Dog"
  }else if(label=="LABEL_98"){
    dogName = "Malamute"
  }else if(label=="LABEL_99"){
    dogName = "Siberian Husky"
  }else if(label=="LABEL_100"){
    dogName = "Affenpinscher"
  }else if(label=="LABEL_101"){
    dogName = "Basenji"
  }else if(label=="LABEL_102"){
    dogName = "Pug"
  }else if(label=="LABEL_103"){
    dogName = "Leonberg"
  }else if(label=="LABEL_104"){
    dogName = "Newfoundland"
  }else if(label=="LABEL_105"){
    dogName = "Great Pyrenees"
  }else if(label=="LABEL_106"){
    dogName = "Samoyed"
  }else if(label=="LABEL_107"){
    dogName = "Pomeranian"
  }else if(label=="LABEL_108"){
    dogName = "Chow"
  }else if(label=="LABEL_109"){
    dogName = "Keeshond"
  }else if(label=="LABEL_110"){
    dogName = "Brabancon Griffon"
  }else if(label=="LABEL_111"){
    dogName = "Pembroke"
  }else if(label=="LABEL_112"){
    dogName = "Cardigan"
  }else if(label=="LABEL_113"){
    dogName = "Toy Poodle"
  }else if(label=="LABEL_114"){
    dogName = "Miniature Poodle"
  }else if(label=="LABEL_115"){
    dogName = "Standard Poodle"
  }else if(label=="LABEL_116"){
    dogName = "Mexican Hairless"
  }else if(label=="LABEL_117"){
    dogName = "Dingo"
  }else if(label=="LABEL_118"){
    dogName = "Dhole"
  }else if(label=="LABEL_119"){
    dogName = "African Hunting Dog"
  }
  return dogName;
}