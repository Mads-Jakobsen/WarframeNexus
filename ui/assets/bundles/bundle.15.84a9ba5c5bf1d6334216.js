(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{134:function(e,t,s){"use strict";s.r(t);var n=s(802),a=s(264);for(var r in a)"default"!==r&&function(e){s.d(t,e,function(){return a[e]})}(r);s(735);var i=s(3),o=Object(i.a)(a.default,n.a,n.b,!1,null,"582e3071",null);t.default=o.exports},264:function(e,t,s){"use strict";s.r(t);var n=s(265),a=s.n(n);for(var r in n)"default"!==r&&function(e){s.d(t,e,function(){return n[e]})}(r);t.default=a.a},265:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e){return e&&e.__esModule?e:{default:e}}(s(65));t.default={components:{docs:n.default}}},266:function(e,t,s){},735:function(e,t,s){"use strict";var n=s(266);s.n(n).a},802:function(e,t,s){"use strict";var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("docs",[s("h1",[e._v("Authentication")]),e._v(" "),s("p",[e._v("\n      In order to access protected endpoints, you'll need an "),s("b",[e._v("access token")]),e._v("\n      which contains data on your user identity and permissions. Our\n      "),s("router-link",{attrs:{to:"/developers/api/clients"}},[e._v("client packages")]),e._v("\n      handle authentication automatically, so we strongly recommend using those if\n      you can.\n      "),s("br"),e._v(" "),s("br"),e._v(" "),s("b",[e._v("All endpoints on this page refer to auth.nexushub.co")])],1),e._v(" "),s("h2",[e._v("Registration")]),e._v(" "),s("p",[e._v("\n      Registration currently requires raw POST requests as we don't have any\n      UI built for it yet. In the future, registered users will be limited to\n      actual user accounts.\n    ")]),e._v(" "),s("a",{staticClass:"btn-subtle active route",attrs:{href:"https://auth.nexushub.co/register",target:"_blank"}},[s("div",{staticClass:"verb"},[e._v("POST")]),e._v("\n      /register\n    ")]),e._v(" "),s("h4",[e._v("Payload")]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[e._v("      "),s("code",{staticClass:"javascript"},[e._v("{\n  user_id: <username>,\n  user_secret: <password>\n}\n")]),e._v("\n    ")]),e._v(" "),s("h4",[e._v("Response")]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[e._v("      "),s("code",{staticClass:"javascript"},[e._v("{\n  user_key: <key>\n}\n")]),e._v("\n    ")]),e._v(" "),s("p",[e._v("\n      The "),s("code",[e._v("user_key")]),e._v(" and "),s("code",[e._v("user_secret")]),e._v(" is what you'll need\n      to get your access/refresh token, so make sure to save them somewhere safe.\n    ")]),e._v(" "),s("h2",[e._v("Getting the access token")]),e._v(" "),s("p",[e._v("\n      The access token is like a passport. It tells us who you are and what\n      you're allowed access. And just like a real passport, they expire way too\n      quickly. For us, this means they expire within "),s("b",[e._v("1 hour")]),e._v(". Don't worry\n      though, you'll also be given a long-lived "),s("code",[e._v("refresh_token")]),e._v(" on\n      your first authentication request.\n      "),s("br"),e._v(" "),s("br"),e._v("\n      This setup helps us mitigate the risk of an attacker abusing leaked access tokens\n      when accessing resource servers.\n    ")]),e._v(" "),s("a",{staticClass:"btn-subtle active route",attrs:{href:"https://auth.nexushub.co/authenticate",target:"_blank"}},[s("div",{staticClass:"verb"},[e._v("POST")]),e._v("\n      /authenticate\n    ")]),e._v(" "),s("h4",[e._v("Payload")]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[e._v("      "),s("code",{staticClass:"javascript"},[e._v("{\n  user_key: <key>,\n  user_secret: <password>,\n}\n")]),e._v("\n    ")]),e._v(" "),s("h4",[e._v("Response")]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[e._v("      "),s("code",{staticClass:"javascript"},[e._v("{\n  access_token: <access_token>,\n  refresh_token: <refresh_token>\n}\n")]),e._v("\n    ")]),e._v(" "),s("h2",[e._v("Refreshing your access token")]),e._v(" "),s("p",[e._v("\n      If you've read everything before (I salute you sir, if you did), you'll\n      know that "),s("b",[e._v("access tokens expire within 1 hour")]),e._v(". To refresh them, we\n      urge you to use the /refresh endpoint instead of authenticating directly again. If\n      the refresh token leaks, we can easily change it, but if your user\n      credentials leak, you might also have trouble on other services where you\n      use the same password.\n    ")]),e._v(" "),s("a",{staticClass:"btn-subtle active route",attrs:{href:"https://auth.nexushub.co/refresh",target:"_blank"}},[s("div",{staticClass:"verb"},[e._v("POST")]),e._v("\n      /refresh\n    ")]),e._v(" "),s("h4",[e._v("Payload")]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[e._v("      "),s("code",{staticClass:"javascript"},[e._v("{\n refresh_token: <refresh_token>\n}\n")]),e._v("\n    ")]),e._v(" "),s("h4",[e._v("Response")]),e._v(" "),s("pre",{directives:[{name:"highlightjs",rawName:"v-highlightjs"}]},[e._v("      "),s("code",{staticClass:"javascript"},[e._v("{\n access_token: <access_token>\n}\n")]),e._v("\n    ")]),e._v(" "),s("h2",[e._v("Further documentation")]),e._v(" "),s("p",[e._v("\n      For detailed docs, including some fancy visualized model, check out the\n      "),s("a",{attrs:{href:"https://github.com/cubic-js/cubic/tree/development/packages/auth"}},[e._v("official Github repo")]),e._v(".\n    ")])])},a=[];s.d(t,"a",function(){return n}),s.d(t,"b",function(){return a})}}]);