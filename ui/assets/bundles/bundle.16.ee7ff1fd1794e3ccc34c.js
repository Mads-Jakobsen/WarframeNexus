(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{135:function(e,t,n){"use strict";n.r(t);var a=n(803),r=n(267);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);n(736);var u=n(3),s=Object(u.a)(r.default,a.a,a.b,!1,null,"2ba6eb2b",null);t.default=s.exports},267:function(e,t,n){"use strict";n.r(t);var a=n(268),r=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t.default=r.a},268:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(e){return e&&e.__esModule?e:{default:e}}(n(65));t.default={components:{docs:a.default}}},269:function(e,t,n){},736:function(e,t,n){"use strict";var a=n(269);n.n(a).a},803:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("docs",[n("h1",[e._v("HTTP connection")]),e._v(" "),n("p",[e._v("\n      HTTP connections are pretty straight forward. Just use the http client\n      of your choice and GET, POST, PATCH, etc any URL you want. If you send\n      a payload, it's alsways gonna be in JSON.\n    ")]),e._v(" "),n("h2",[e._v("Authentication")]),e._v(" "),n("p",[e._v("\n      For requests that require authentication, put your access token in the\n      "),n("code",[e._v("Authorization")]),e._v(" header as "),n("code",[e._v('"Bearer <your_token>"')]),e._v(".\n    ")]),e._v(" "),n("br"),e._v(" "),n("h4",[e._v("Authenticated request example (Node.js)")]),e._v(" "),n("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[e._v("      "),n("code",{staticClass:"javascript"},[e._v("const request = require('request-promise')\n\n// Set it as default, so we don't have to do it on every single request.\nrequest.defaults({\n  baseUrl: 'https://api.nexushub.co'\n  headers: {\n    Authorization: 'Bearer <access_token>'\n  }\n})\n\nconst secretUserData = await request.get('/super/secret/userdata')\n")]),e._v("\n    ")]),e._v(" "),n("p",[e._v("\n      For more information on how to get an access token, check out the\n      "),n("router-link",{attrs:{to:"/developers/api/authentication"}},[e._v("authentication guide")]),e._v(".\n    ")],1)])},r=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return r})}}]);