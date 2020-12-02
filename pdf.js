const pdf= require('html-pdf');

const content = `
    <h1>  TITULO DE PDF CREADO <\h1>
    <p> Genera dor de PDF con HTML sencillo<\p>
`;

pdf.create(content).toFile('./html-pdf.pdf', function(err,res){
    if(err){
        console.log(err);
    }
    else{
        console.log(res);
    }
});