//const oauthRSASHAPKCS1 = require("./oauthRSA-SHA-PKCS.js");
require("dotenv").config();
const fetch = require("node-fetch");
const oauth = require("mastercard-oauth1-signer");
const express = require("express");

/*const clientEncryption = require("mastercard-client-encryption");
const config = {
  //https://github.com/Mastercard/issuing-api-reference-app
  paths: [
    {
      path: "/tokenize",
      toEncrypt: [
        {
          element: "cardInfo.encryptedData",
          obj: "cardInfo"
        },
        {
          element: "fundingAccountInfo.encryptedPayload.encryptedData",
          obj: "fundingAccountInfo.encryptedPayload"
        }
      ],
      toDecrypt: [
        {
          element: "tokenDetail",
          obj: "tokenDetail.encryptedData"
        }
      ]
    },
    {
      path: "/searchTokens",
      toEncrypt: [
        {
          element: "cardInfo.encryptedData",
          obj: "cardInfo"
        },
        {
          element: "fundingAccountInfo.encryptedPayload.encryptedData",
          obj: "fundingAccountInfo.encryptedPayload"
        }
      ],
      toDecrypt: []
    },
    {
      path: "/getToken",
      toEncrypt: [],
      toDecrypt: [
        {
          element: "tokenDetail",
          obj: "tokenDetail.encryptedData"
        }
      ]
    },
    {
      path: "/transact",
      toEncrypt: [],
      toDecrypt: [
        {
          element: "encryptedPayload",
          obj: "encryptedPayload.encryptedData"
        }
      ]
    },
    {
      path: "/notifyTokenUpdated",
      toEncrypt: [
        {
          element: "encryptedPayload.encryptedData",
          obj: "encryptedPayload"
        }
      ],
      toDecrypt: []
    }
  ],
  oaepPaddingDigestAlgorithm: "SHA-512",
  ivFieldName: "iv",
  encryptedKeyFieldName: "encryptedKey",
  encryptedValueFieldName: "encryptedData",
  oaepHashingAlgorithmFieldName: "oaepHashingAlgorithm",
  publicKeyFingerprintFieldName: "publicKeyFingerprint",
  publicKeyFingerprintType: "certificate",
  dataEncoding: "hex",
  encryptionCertificate: "./path/to/your/encryption.crt",
  privateKey: "./path/to/your/private.key"
};*/

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

const serializeHeader = (
  uri,
  method,
  body = {
    pageOffset: "1",
    pageLength: "10",
    postalCode: "07704"
  }
) => {
  var payload = "";
  //Object.keys(body)[0] === "pageOffset" && "GET"
  if (method === "GET")
    payload =
      "?" +
      Object.keys(body).map(
        (x, i) =>
          x + "=" + body[x] + (i !== Object.keys(body).length - 1 ? "&" : "")
      );
  var signingKey = process.env.p12; //oauthRSASHAPKCS1.p12;
  signingKey = signingKey
    .split("-----BEGIN RSA PRIVATE KEY-----")[1]
    .split("-----END RSA PRIVATE KEY-----")[0];
  signingKey =
    "-----BEGIN RSA PRIVATE KEY-----" +
    signingKey.replace(/ /g, `\n`) +
    "-----END RSA PRIVATE KEY-----";
  payload = payload.replace(/,/g, "");
  return {
    body,
    payload,
    authHeader: oauth.getAuthorizationHeader(
      uri + payload,
      method,
      body,
      process.env.consumerKey, //oauthRSASHAPKCS1.consumerKey,
      signingKey //fs.readFileSync("src/Passwordlike-sandbox.p12", 'binary')
    )
  }; //Buffer.from(,'utf8)
};
app /*.use((_req, _res, next) => {
    if (allowedOrigins.indexOf(origin) === -1) return res.send(401, `{error:${"no access for this origin- " + origin}}`);
    res.set("Access-Control-Allow-Origin", allowedOrigins[allowedOrigins.indexOf(origin)]);
    res.set("Access-Control-Allow-Headers", "Origin, Content-Type, Referer, Accept");
    res.set("Content-Type", "Application/JSON");next()})*/
  //.get("/", (req, res) => res.status(200).send("shove it"))
  .options("/", (req, res) => {
    var origin = req.headers.origin; //https://stackoverflow.com/questions/36554375/getting-the-request-origin-in-express
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
    res.set("Content-Type", "Application/JSON"); //res.send(200,"ok")
    res.status(204).send({ data: "ok" }); //res.sendStatus(204);
  })
  .post("/", (req, res) => {
    //res.status(200).send({data:"ok"});
    //if (request.method === "OPTIONS")return res.send(`preflight response for POST`);
    res.set("Content-Type", "Application/JSON");
    var origin = req.headers.origin;
    res.set("Access-Control-Allow-Origin", origin);
    /* https://github.com/NickCarducci/mastercard-forge-pkcs-oauth-rsasha
       const forge = require("node-forge"), fs = require("fs"), 
                     p12Content = fs.readFileSync("<insert PKCS#12 key file path>", 'binary');
       const t = `METHOD&http%3A%2F%2Fsandbox.api.mastercard.com/atms/v1/atm        
            %26oauth_consumer_key%3Ddpf43f3p2l4k3l03
            %26oauth_nonce%3Dkllo9940pd9333jh
            %26oauth_signature_method%3DHMAC-SHA1
            %26oauth_timestamp%3D1191242096
            %26oauth_token%3Dnnch734d00sl2jdk
            %26oauth_version%3D1.0
            %26size%3Doriginal`;
        const p12Content = fs.readFileSync("src/Passwordlike-sandbox.p12", 'binary');
        const p12 = forge.pkcs12.pkcs12FromAsn1(
            forge.asn1.fromDer(p12Content, false),
            false,
            "Passwordlike"
        );
        const signingKey = forge.pki.privateKeyToPem(p12.getBags({
            friendlyName: "Passwordlike",
            bagType: forge.pki.oids.pkcs8ShroudedKeyBag
        }).friendlyName[0].key);*/

    const { authHeader, payload /*, body*/ } = serializeHeader(
      "https://sandbox.api.mastercard.com/atms/v1/atm",
      "GET", //req.method,
      null //req.body, //_data
    );
    //res.status(204).send(authHeader);
    var status = 200,
      statusText = "defaultText";
    fetch("https://sandbox.api.mastercard.com/atms/v1/atm" + payload, {
      headers: {
        //Accept: "application/json","Access-Control-Request-Headers":"accept",
        Authorization: authHeader
      }
      //body: JSON.stringify(req.body),method: "POST"
    }) //https://developer.mastercard.com/mastercard-send-funding/documentation/api-basics/#http-headers
      .then(async (res) => {
        statusText = res.statusText;
        status = res.status;
        //res.status(200).send(res)
        /*var parser = new DOMParser();
        var doc = parser.parseFromString(res, "text/html");
        var html = JSON.stringify(doc.querySelector("pre").innerHTML);
        console.log(html.substring(0, html.indexOf("<br>")));*/
        return await res.text();
      })
      .then((data) => {
        res.status(status).send({ statusText, data });
      })
      .catch((er) => {
        res.status(405).send(er);
      });
  })
  .get(
    "/",
    (
      req,
      res
    ) => {
      var { authHeader, payload, body } =
        serializeHeader(
          "https://sandbox.mi.api.mastercard.com/mi-issuing-sandbox/card-issuance/prepaid-cards",
          "POST",
          JSON.stringify(
            req.body
              ? req.body
              : {
                "X-MC-Bank-Code": "112233",
                "X-MC-Correlation-ID": "ac97d177-9345-4934-8343-0f91a7a02836",
                "X-MC-Source": "MAP",
                "X-MC-Client-Application-User-ID": "S0648-IN",
                "X-MC-Idempotency-Key": "bc57d177-4593-3449-8343-0d81a7a02947"
              }
          )
        )
      res.set("Content-Type", "Application/JSON");
      res.set("Access-Control-Allow-Origin", req.headers.origin);
      body = JSON.stringify(body);
      var statusText = "defaultText",
        status = 200;
      //https://developer.mastercard.com/mdes-digital-enablement/documentation/api-reference/
      //let api = new service.TokenizeApi();api.createTokenize
      fetch(
        "https://api.mastercard.com/mdes/digitization/static/1/0/tokenize",
        {
          //tokenizeRequestSchema:
          headers: {
            "Content-Type": "application/json",
            //"Access-Control-Request-Headers":"accept",
            Authorization: authHeader,
            Accept: "application/json"
          },
          body,
          method: "POST"
        }
      )
        .then(async (res) => {
          statusText = res.statusText;
          status = res.status;
          return { encryptedData: await res.text() };
        })
        .then(
          (
            fundingAccountInfo = (encryptedPayload) => {
              encryptedPayload;
            }
          ) => {
            body = {
              responseHost: "site1.your-server.com", //"vault-co.in"
              tokenRequestorId: "98765432101",
              tokenType: "CLOUD",
              fundingAccountInfo,
              taskId: "123456",
              consumerLanguage: "en",
              tokenizationAuthenticationValue:
                "RHVtbXkgYmFzZSA2NCBkYXRhIC0gdGhpcyBpcyBub3QgYSByZWFsIFRBViBleGFtcGxl",
              requestId: "123456"
            };
            body["decisioningData"] = {
              recommendation: "APPROVED",
              recommendationAlgorithmVersion: "01",
              deviceScore: "1",
              accountScore: "1",
              recommendationReasons: ["LONG_ACCOUNT_TENURE"],
              deviceCurrentLocation: "38.63,-90.25",
              deviceIpAddress: "127.0.0.1",
              mobileNumberSuffix: 3456
            };
            body = JSON.stringify(body);
            //(error, data, response) => {
            //TokenizeResponseSchema https://github.com/Mastercard/mastercard-api-client-tutorial/tree/main/nodejs
            fetch(
              "https://sandbox.mi.api.mastercard.com/mi-issuing-sandbox/card-issuance/prepaid-cards",// +payload,
              {
                headers: {
                  "Content-Type": "application/json",
                  //"Access-Control-Request-Headers":"accept",
                  Authorization: authHeader,
                  Accept: "application/json"
                },
                body,
                method: "POST"
              }
            ) //https://developer.mastercard.com/mastercard-send-funding/documentation/api-basics/#http-headers
              .then(async (res) => {
                statusText = res.statusText;
                status = res.status;
                return await res.text();
              })
              .then((data) => {
                res.status(status).send({ statusText, data });
              })
              .catch((er) => {
                res.status(403).send(er);
              });
          }
        )
        .catch((er) => {
          res.status(401).send(er);
        });
    }
  )
  .listen(port, () => console.log(`localhost:${port}`));
