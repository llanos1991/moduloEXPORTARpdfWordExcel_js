const conversionFactory =require('html-to-xlsx');
const  puppeteer=require('puppeteer');
const chromeEval=require('chrome-page-eval')({puppeteer});
const util = require('util');
const fs= require('fs');
const path = require('path');
const writeFileAsync = util.promisify(fs.writeFile);

const conversion = conversionFactory(
    {
        extract: async ({ html, ...restOptions }) => {
            //Cambiar la ruta de path.join absoluta.
            const tmpHtmlPath = path.join('C:/Users/usuario/Desktop/moduloEXPORTARpdfWordExcel_js/temp', 'input.html')
            console.log(tmpHtmlPath);
           
            await writeFileAsync(tmpHtmlPath, html)
         
            const result = await chromeEval({
              ...restOptions,
              html: tmpHtmlPath,
              scriptFn: conversionFactory.getScriptFn()
            })

     const tables = Array.isArray(result) ? result : [result]
   
      return tables.map((table) => ({
        name: table.name,
        getRows: async (rowCb) => {
          table.rows.forEach((row) => {
            rowCb(row)
          })
        },
        rowsCount: table.rows.length
      }))

    }} 
)


  async function run () {
    const stream = await conversion(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" ><title>laura</title></head><body><table><tr><td> JESUS </td></tr><tr><td> MARIA </td></tr></table></body></html>`)
   
    stream.pipe(fs.createWriteStream('./excel.xlsx'))
  }
   
  run()
  