// https://stackoverflow.com/questions/39097948/simple-search-function-with-javascript
var terms = new Array();
var max = 6;
            
for (i=1;i<=max;i++) { 
    terms[i] = new Array();
}
            
terms[1]['search'] = 'google internet search web'; 
terms[1]['des'] = 'Google search'; 
terms[1]['lnk'] = 'http://www.google.com';

terms[2]['search'] = 'gmx mail email'; 
terms[2]['des'] = 'GMX Mail'; 
terms[2]['lnk'] = 'http://www.gmx.com';

terms[3]['search'] = 'web mail email'; 
terms[3]['des'] = 'Web Mail'; 
terms[3]['lnk'] = 'http://www.web.com';

terms[4]['search'] = 'youtube video your self'; 
terms[4]['des'] = 'Youtube Video'; 
terms[4]['lnk'] = 'http://www.youtube.com';

terms[5]['search'] = 'wikipedia search knowledge'; 
terms[5]['des'] = 'Wikipedia'; 
terms[5]['lnk'] = 'http://www.wikipedia.com';

terms[6]['search'] = 'facebook social'; 
terms[6]['des'] = 'Facebook'; 
terms[6]['lnk'] = 'https://www.facebook.com';
            
function search() {
    var input = document.getElementById('searchbar').value.toLowerCase();
    var i=0;
    var list="";
    var pos=-1;
                
    if(input!="") { 
        for(i=1; i<=max; i++) { 
            pos= terms[i]['search'].indexOf(input);
            
            if(pos!=-1) { 
                list= list + '<a class="search_lnk" href="'+terms[i]['lnk']+'">' + terms[i]['des'] + '</a>' + '<br>'; 
            }   
            pos=-1;
        }
        console.log(list);
        if(list==""){ 
            document.getElementById("listing").innerHTML = "";
            document.getElementById("listing").style.display = "none";
        } else { 
            document.getElementById("listing").innerHTML = list;
            document.getElementById("listing").style.display = "block";
        }
    }
}