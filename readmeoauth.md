## ['signing'(Private)Key](https://github.com/Mastercard/oauth1-signer-ruby/blob/1187441f84b2eb07524cd1fc11f3be8e94e21609/lib/oauth.rb#L196), 'sbs'SignatureBase

[POSTHTTPS<path><query><protocol>.split("oauth_signature")[0]<body>](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.1.3)

"HMAC-SHA1" (client [key,token[credentials](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.1.3.2)])
"RSA-SHA1" (private [key,signature[PKCS#1](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.3)])
"PLAINTEXT" (TLS/SSH)

[test_get_authorization_header](https://github.com/Mastercard/oauth1-signer-ruby/blob/main/tests/test_oauth.rb)

>uri, method, nil, consumer_key, signing_key

>~~[except in zsh, shell variables cannot store arbitrary](https://unix.stackexchange.com/questions/369972/how-can-i-set-an-environment-variable-which-contains-newline-characters) sequences of bytes~~

~~`export p12=$(< file_to_be_read)`~~

[`openssl pkcs12 -info -in Passwordlike-sandbox.p12 -nodes -nocerts`](https://www.ssl.com/how-to/export-certificates-private-key-from-pkcs12-file-with-openssl/) 

paste this into `src/oauthRSA-SHA-PKCS1.js\p12` instead of export environment with new lines

`src/oauthRSA-SHA-PKCS1.js`
````
const consumerKey = "";
const p12 = "";

export default {
    consumerKey,
    p12
}
````