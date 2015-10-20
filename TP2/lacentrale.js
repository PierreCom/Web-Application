var lacentraleLinks = function (dataJson,callback)
{

    var http = require('http')
    var bl = require('bl')

    dataJson.Brand.replace(' ','+')

    http.get('http://www.lacentrale.fr/cote-voitures-'+dataJson.Brand+'-'+dataJson.Model+'--'+dataJson.Year+'-.html',
    function (response) {
      response.pipe(bl(function (err, data) {
        if (err)
          {
    				callback(err);
    				return;
    			}
        var data = data.toString()

        var nameVersion = []
        var listLinks = []

        while (data.indexOf('begin file tb_item_listing_auto_quot_flat.php')>1)
        {
        var todelete = data.substring(data.indexOf('begin file tb_item_listing_auto_quot_flat.php'),data.indexOf('end file tb_item_listing_auto_quot_flat.php')+47)
        var version = data.substring(data.indexOf('<td class="tdSD QuotMarque">')+35,data.indexOf('<td class="tdSD QuotPrice" style="background:#f8f8f8">')-9)
        //var versionResult = version.substring(version.indexOf('">')+2,version.indexOf('</td>')-10)
        var link = version.substring(version.indexOf('href="')+6,version.indexOf('title=')-2)

        listLinks.push(link)

        var data = data.replace(todelete,"")
        }

        callback(listLinks)
      }))
    })

}

var lacentraleVersion = function (dataJson,callback)
{

    var http = require('http')
    var bl = require('bl')

    dataJson.Brand.replace(' ','+')

    http.get('http://www.lacentrale.fr/cote-voitures-'+dataJson.Brand+'-'+dataJson.Model+'--'+dataJson.Year+'-.html',
    function (response) {
      response.pipe(bl(function (err, data) {
        if (err)
          {
    				callback(err);
    				return;
    			}
        var data = data.toString()

        var nameVersion = []

        while (data.indexOf('begin file tb_item_listing_auto_quot_flat.php')>1)
        {
        var todelete = data.substring(data.indexOf('begin file tb_item_listing_auto_quot_flat.php'),data.indexOf('end file tb_item_listing_auto_quot_flat.php')+47)
        var version = data.substring(data.indexOf('<td class="tdSD QuotMarque">')+35,data.indexOf('<td class="tdSD QuotPrice" style="background:#f8f8f8">')-9)
        var versionResult = version.substring(version.indexOf('">')+2,version.indexOf('</td>')-10)
        //var link = version.substring(version.indexOf('href="')+6,version.indexOf('title=')-2)

        nameVersion.push(versionResult)

        var data = data.replace(todelete,"")
        }

        callback(nameVersion)
      }))
    })

}


exports.lacentraleLinks = lacentraleLinks;
exports.lacentraleVersion = lacentraleVersion;
