
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
let keyword = 'internet';


writeStream.write(`Title,Content,Link,Date,Image \n`);

request(`https://www.detik.com/search/searchall?query=${keyword}&siteid=2`, (error,
response, html) => {
    if (!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        $('article').each((i,el) => {
            const title =$(el)
            .find('.title')
            .text()
            .replace(/,/g, ' ');
            //.replace(///\s\s+/g, '');

            const content =$(el)
            .find('p')
            .text()
            .replace(/,/g, ' ');

            const date =$(el)
            .find('.date')
            .text()
            .replace(/,/g, ' ');

            const link =$(el)
            .find('a')
            .attr('href');

            const img =$(el)
            .find('img')
            .attr('src');

            console.log('Judul :',title);
            console.log('Link :', link);
            console.log('Isi Content :', content);
            console.log('Tanggal :', date);
            console.log('Image :', img ,'\n');

            writeStream.write(`${title}, ${content}, ${link}, ${date}, ${img} \n`);
            //document.getElementById("theTitle").innerHTML = title;
            //console.log('\n');
        });

        console.log('Scraping Done...');
    }
});
