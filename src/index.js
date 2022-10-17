
const fetch = require("node-fetch");
const oauth = require("mastercard-oauth1-signer");
const express = require("express");/*
const forge = require("node-forge");
//const fs = require("fs"), p12Content = fs.readFileSync("<insert PKCS#12 key file path>", 'binary');

const p12 = forge.pkcs12.pkcs12FromAsn1(
  forge.asn1.fromDer(oauthRSASHAPKCS1.p12, false),
  false,
  "<insert key password>"
);
const keyObj = p12.getBags({
  friendlyName: "<insert key alias>",
  bagType: forge.pki.oids.pkcs8ShroudedKeyBag
}).friendlyName[0];
const signingKey = forge.pki.privateKeyToPem(keyObj.key);*/
const fs = require("fs");
const oauthRSASHAPKCS1 = fs.readFileSync("src/oauthRSA-SHA-PKCS.js", 'binary');
/*async function noException(req, env) {
    // key => Object ID; return new Response(JSON.stringify(backbank));
    // boot instance, if necessary //https://<worker-name>.<your-namespace>.workers.dev/
    //https://linc.sh/blog/durable-objects-in-production
    //const clientId = request.headers.get("cf-connecting-ip");
    var allowedOrigins = [
        "https://sausage.saltbank.org",
        "https://i7l8qe.csb.app",
        "https://vau.money",
        "https://jwi5k.csb.app",
    ];

    const urlObject = new URL(req.url); //.pathname;//path
    var origin = urlObject.origin; // request.headers.get("Origin");
    //"no access for this origin: " + origin
    if (allowedOrigins.indexOf(origin) === -1) return JSON.stringify(`{error:${"no access for this origin- " + origin}}`);
    const /*href = urlObject.searchParams.get("name"), * /dataHead = {
        "Content-Type": "application/json"
    };

    return UseDependency();
}*/

const app = express();
const port = 8080;
//http://johnzhang.io/options-request-in-express
//var origin = req.get('origin');
var allowedOrigins = [
  "https://sausage.saltbank.org",
  "https://i7l8qe.csb.app",
  "https://vau.money",
  "https://jwi5k.csb.app"
];
app /*.use((_req, _res, next) => {
    if (allowedOrigins.indexOf(origin) === -1) return res.send(401, `{error:${"no access for this origin- " + origin}}`);
    //res.header("":_)
    res.set("Access-Control-Allow-Origin", allowedOrigins[allowedOrigins.indexOf(origin)]);
    res.set("Access-Control-Allow-Headers", "Origin, Content-Type, Referer, Accept");
    res.set("Content-Type", "Application/JSON");
    //res.send(200,"ok")
    next()
})*/
  .get("/", (req, res) => res.status(200).send("shove it"))
  //https://stackoverflow.com/questions/36554375/getting-the-request-origin-in-express
  .options("/", (req, res) => {
    var origin = req.headers.origin;
    if (allowedOrigins.indexOf(origin) === -1)
      return res
        .status(401)
        .send(`{error:${"no access for this origin- " + origin}}`);
    //res.header("":_)
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
    res.set(
      "Access-Control-Allow-Origin",
      allowedOrigins[allowedOrigins.indexOf(origin)]
    );
    res.set(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Access-Control-Allow-Methods, Origin, Content-Type, Referer, Accept"
    );
    res.set("Content-Type", "Application/JSON");
    //res.send(200,"ok")
    res.status(204).send({ data: "ok" });
    //res.sendStatus(204);
  })
  .post("/", (req, res) => {
    //if (request.method === "OPTIONS")return res.send(`preflight response for POST`);
    res.set("Content-Type", "Application/JSON");
    var origin = req.headers.origin;
    res.set("Access-Control-Allow-Origin", origin);
    //res.status(200).send({data:"ok"});

    /*const t = `METHOD&http%3A%2F%2Fsandbox.api.mastercard.com/atms/v1/atm        
        %26oauth_consumer_key%3Ddpf43f3p2l4k3l03
        %26oauth_nonce%3Dkllo9940pd9333jh
        %26oauth_signature_method%3DHMAC-SHA1
        %26oauth_timestamp%3D1191242096
        %26oauth_token%3Dnnch734d00sl2jdk
        %26oauth_version%3D1.0
        %26size%3Doriginal`;*/

    /*const p12Content = fs.readFileSync("src/Passwordlike-sandbox.p12", 'binary');
    const p12 = forge.pkcs12.pkcs12FromAsn1(
        forge.asn1.fromDer(p12Content, false),
        false,//https://github.com/NickCarducci/mastercard-forge-pkcs-oauth-rsasha
        "Passwordlike"
    );
    const signingKey = forge.pki.privateKeyToPem(p12.getBags({
        friendlyName: "Passwordlike",
        bagType: forge.pki.oids.pkcs8ShroudedKeyBag
    }).friendlyName[0].key);*/
    var edit = oauthRSASHAPKCS1.p12;
    edit = edit
      .split("-----BEGIN RSA PRIVATE KEY-----")[1]
      .split("-----END RSA PRIVATE KEY-----")[0];
    edit =
      "-----BEGIN RSA PRIVATE KEY-----" +
      edit.replaceAll(" ", `\n`) +
      "-----END RSA PRIVATE KEY-----";
    //res.status(200).send(edit);
    //res.status(200).send(fs.readFileSync("src/Passwordlike-sandbox.p12", 'binary'))
    //res.status(200).send({error:process.env.test});
    const authHeader = oauth.getAuthorizationHeader(
      "https://sandbox.api.mastercard.com/atms/v1/atm",
      "POST", //req.method,
      "", //req.body, //_data
      oauthRSASHAPKCS1.consumerKey, //proess.env
      //fs.readFileSync("src/Passwordlike-sandbox.p12", 'binary')
      edit //signingKey//private ("signing"/reading) key
    ); //Buffer.from(,'utf8)
    //res.status(204).send(authHeader);
    fetch("https://sandbox.api.mastercard.com/atms/v1/atm", {
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: authHeader
      },
      body: JSON.stringify(req.body),
      method: "POST"
    })
      .then(async (res) => await res.json())
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((er) => {
        res.status(204).send(er);
      });
  })
  .listen(port, () => console.log(`localhost:${port}`));
