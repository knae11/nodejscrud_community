module.exports = {
  HTML: function (title, body) {
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      ${body}
    </body>
    </html>
    `;
  },
  // list: function (filelist) {
  //   var list = "<ul>";
  //   var i = 0;
  //   while (i < filelist.length) {
  //     list =
  //       list + `<li><a href="/topic/${filelist[i]}">${filelist[i]}</a></li>`;
  //     i = i + 1;
  //   }
  //   list = list + "</ul>";
  //   return list;
  // },
};
