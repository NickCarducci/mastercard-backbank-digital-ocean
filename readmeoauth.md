## ['signing'(Private)Key](https://github.com/Mastercard/oauth1-signer-ruby/blob/1187441f84b2eb07524cd1fc11f3be8e94e21609/lib/oauth.rb#L196), 'sbs'SignatureBase

[POSTHTTPS<path><query><protocol>.split("oauth_signature")[0]<body>](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.1.3)

"HMAC-SHA1" (client [key,token[credentials](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.1.3.2)])
"RSA-SHA1" (private [key,signature[PKCS#1](https://www.rfc-editor.org/rfc/rfc5849#section-3.4.3)])
"PLAINTEXT" (TLS/SSH)

[test_get_authorization_header](https://github.com/Mastercard/oauth1-signer-ruby/blob/main/tests/test_oauth.rb)

>uri, method, nil, consumer_key, signing_key