const fetch = require("node-fetch");
const oauth = require("mastercard-oauth1-signer");
const express = require("express");

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

        //res.status(200).send({error:process.env.test});
        const authHeader = oauth.getAuthorizationHeader(
            "https://sandbox.api.mastercard.com/atms/v1/atm",
            req.method,
            req.body,
            process.env.consumerKey,
            process.env.p12
        );
        fetch("https://sandbox.api.mastercard.com/atms/v1/atm", {
            headers: { "Content-Type": "Application/JSON", Authorization: authHeader }
            , body: JSON.stringify(req.body), method: "POST"
        })
            .then(async res => await res.json())
            .then(data => {
                res.status(200).send(data);
            })
            .catch(er=>{
                res.status(204).send(er);
            })

    })
    .listen(port, () => console.log(`localhost:${port}`));
