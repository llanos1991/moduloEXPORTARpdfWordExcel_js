const conversionFactory =require('html-to-xlsx');
const  puppeteer=require('puppeteer');
const chromeEval=require('chrome-page-eval')({puppeteer});
const util = require('util');
const fs= require('fs');
const writeFileAsync = util.promisify(fs.writeFile);

/*
const conversion = conversionFactory({
    extract: async ({ html, ...restOptions }) => {
      //const tmpHtmlPath = path.join('/path/to/temp', 'input.html')
      const tmpHtmlPath = require('./input.html')
      //console.log(tmpHtmlPath);
      await writeFileAsync(tmpHtmlPath, html)
      //await writeFileAsync(html)
   
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
    }
  })
   

  */

const conversion = conversionFactory(
    {
        extract: async ({ html, ...restOptions }) => {
            const tmpHtmlPath = path.join('./temp', 'input.html')
         
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
    const stream = await conversion(`<table><tr><td>cell value</td></tr></table>`)
   
    stream.pipe(fs.createWriteStream('excel.xlsx'))
  }
   
  run()
  