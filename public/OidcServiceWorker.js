const N = "OidcTrustedDomains.js", y = "*", _ = {
  REFRESH_TOKEN: "REFRESH_TOKEN_SECURED_BY_OIDC_SERVICE_WORKER",
  ACCESS_TOKEN: "ACCESS_TOKEN_SECURED_BY_OIDC_SERVICE_WORKER",
  NONCE_TOKEN: "NONCE_SECURED_BY_OIDC_SERVICE_WORKER",
  CODE_VERIFIER: "CODE_VERIFIER_SECURED_BY_OIDC_SERVICE_WORKER"
}, v = {
  access_token_or_id_token_invalid: "access_token_or_id_token_invalid",
  access_token_invalid: "access_token_invalid",
  id_token_invalid: "id_token_invalid"
}, A = "/.well-known/openid-configuration";
function x(n, t) {
  if (!t)
    return;
  if (!n.find((e) => {
    var s;
    let o;
    return typeof e == "string" ? o = new RegExp(`^${e}`) : o = e, (s = o.test) == null ? void 0 : s.call(o, t);
  }))
    throw new Error(
      "Domain " + t + " is not trusted, please add domain in " + N
    );
}
const D = (n, t, i) => {
  var e;
  if (t.endsWith(A))
    return null;
  for (const [o, s] of Object.entries(n)) {
    const a = s.oidcServerConfiguration;
    if (!a || a.tokenEndpoint && t === a.tokenEndpoint || a.revocationEndpoint && t === a.revocationEndpoint)
      continue;
    const u = a.userInfoEndpoint ? [a.userInfoEndpoint, ...i[o]] : [...i[o]];
    let c = !1;
    if (u.find((l) => l === y))
      c = !0;
    else
      for (let l = 0; l < u.length; l++) {
        let r = u[l];
        if (typeof r == "string" && (r = new RegExp(`^${r}`)), (e = r.test) != null && e.call(r, t)) {
          c = !0;
          break;
        }
      }
    if (c)
      return s.tokens ? s : null;
  }
  return null;
};
function K(n, t) {
  return n.split(t).length - 1;
}
function M(n) {
  return JSON.parse(
    P(n.split(".")[1].replace("-", "+").replace("_", "/"))
  );
}
function P(n) {
  return decodeURIComponent(
    Array.prototype.map.call(
      atob(n),
      (t) => "%" + ("00" + t.charCodeAt(0).toString(16)).slice(-2)
    ).join("")
  );
}
function U(n, t) {
  const i = new Date().getTime() / 1e3;
  return Math.round(
    t - n - i
  );
}
function W(n) {
  return n ? U(0, n.expiresAt) > 0 : !1;
}
const w = (n) => {
  try {
    return n && K(n, ".") === 2 ? M(n) : null;
  } catch (t) {
    console.warn(t);
  }
  return null;
}, F = (n, t, i) => {
  if (n.idTokenPayload) {
    const e = n.idTokenPayload;
    if (i.issuer !== e.iss)
      return { isValid: !1, reason: "Issuer does not match" };
    const o = new Date().getTime() / 1e3;
    if (e.exp && e.exp < o)
      return { isValid: !1, reason: "Token expired" };
    const s = 60 * 60 * 24 * 7;
    if (e.iat && e.iat + s < o)
      return { isValid: !1, reason: "Token is used from too long time" };
    if (e.nonce && e.nonce !== t)
      return { isValid: !1, reason: "Nonce does not match" };
  }
  return { isValid: !0, reason: "" };
};
function O(n) {
  const t = n.configurationName;
  return (i) => i.status !== 200 ? i : i.json().then((e) => {
    if (!e.issued_at) {
      const f = new Date().getTime() / 1e3;
      e.issued_at = f;
    }
    const o = w(e.access_token), s = {
      ...e,
      access_token: _.ACCESS_TOKEN + "_" + t,
      accessTokenPayload: o
    };
    e.accessTokenPayload = o;
    let a = null;
    if (e.id_token) {
      if (a = w(e.id_token), e.idTokenPayload = { ...a }, a.nonce && n.nonce != null) {
        const f = _.NONCE_TOKEN + "_" + n.configurationName;
        a.nonce = f;
      }
      s.idTokenPayload = a;
    }
    e.refresh_token && (s.refresh_token = _.REFRESH_TOKEN + "_" + t);
    const u = a && a.exp ? a.exp : Number.MAX_VALUE, c = o && o.exp ? o.exp : e.issued_at + e.expires_in;
    let l;
    const r = n.oidcConfiguration.token_renew_mode;
    r === v.access_token_invalid ? l = c : r === v.id_token_invalid ? l = u : l = u < c ? u : c, s.expiresAt = l, e.expiresAt = l;
    const T = n.nonce ? n.nonce.nonce : null, { isValid: d, reason: k } = F(
      e,
      T,
      n.oidcServerConfiguration
    );
    if (!d)
      throw Error(`Tokens are not OpenID valid, reason: ${k}`);
    if (n.tokens != null && "refresh_token" in n.tokens && !("refresh_token" in e)) {
      const f = n.tokens.refresh_token;
      n.tokens = {
        ...e,
        refresh_token: f
      };
    } else
      n.tokens = e;
    n.status = "LOGGED_IN";
    const p = JSON.stringify(s);
    return new Response(p, i);
  });
}
function C(n) {
  const t = {};
  for (const i of n.keys())
    n.has(i) && (t[i] = n.get(i));
  return t;
}
const V = (n) => new Promise((t) => setTimeout(t, n)), g = self;
g.importScripts(N);
const I = Math.round(new Date().getTime() / 1e3).toString(), b = "OidcKeepAliveServiceWorker.json", q = (n) => {
  console.log("[OidcServiceWorker] service worker installed " + I), n.waitUntil(g.skipWaiting());
}, L = (n) => {
  console.log("[OidcServiceWorker] service worker activated " + I), n.waitUntil(g.clients.claim());
};
let S = null;
const h = {
  default: {
    configurationName: "default",
    tokens: null,
    status: null,
    state: null,
    codeVerifier: null,
    nonce: null,
    oidcServerConfiguration: null
  }
}, H = (n, t) => {
  const i = [];
  for (const [, e] of Object.entries(n))
    (e.oidcServerConfiguration != null && t.startsWith(e.oidcServerConfiguration.tokenEndpoint) || e.oidcServerConfiguration != null && e.oidcServerConfiguration.revocationEndpoint && t.startsWith(e.oidcServerConfiguration.revocationEndpoint)) && i.push(e);
  return i;
}, j = async (n) => {
  const i = n.request.headers.has("oidc-vanilla"), e = { status: 200, statusText: "oidc-service-worker" }, o = new Response("{}", e);
  if (!i)
    for (let s = 0; s < 240; s++)
      await V(1e3 + Math.floor(Math.random() * 1e3)), await (await caches.open("oidc_dummy_cache")).put(n.request, o.clone());
  return o;
}, J = async (n) => {
  const t = n.request, i = t.url;
  if (t.url.includes(b)) {
    n.respondWith(j(n));
    return;
  }
  const e = D(
    h,
    t.url,
    trustedDomains
  );
  if (e && e.tokens && e.tokens.access_token) {
    for (; e.tokens && !W(e.tokens); )
      await V(200);
    const u = new Request(t, {
      headers: {
        ...C(t.headers),
        authorization: "Bearer " + e.tokens.access_token
      },
      mode: e.oidcConfiguration.service_worker_convert_all_requests_to_cors ? "cors" : t.mode
    });
    n.waitUntil(n.respondWith(fetch(u)));
    return;
  }
  if (n.request.method !== "POST")
    return;
  let o = null;
  const s = H(
    h,
    t.url
  ), a = s.length;
  if (a > 0) {
    const u = new Promise((c, l) => {
      const r = t.clone();
      r.text().then((d) => {
        if (d.includes(_.REFRESH_TOKEN) || d.includes(_.ACCESS_TOKEN)) {
          let k = d;
          for (let f = 0; f < a; f++) {
            const E = s[f];
            if (E && E.tokens != null) {
              const m = _.REFRESH_TOKEN + "_" + E.configurationName;
              if (d.includes(m)) {
                k = k.replace(
                  m,
                  encodeURIComponent(E.tokens.refresh_token)
                ), o = E;
                break;
              }
              const R = _.ACCESS_TOKEN + "_" + E.configurationName;
              if (d.includes(R)) {
                k = k.replace(
                  R,
                  encodeURIComponent(E.tokens.access_token)
                ), o = E;
                break;
              }
            }
          }
          const p = fetch(t, {
            body: k,
            method: r.method,
            headers: {
              ...C(t.headers)
            },
            mode: r.mode,
            cache: r.cache,
            redirect: r.redirect,
            referrer: r.referrer,
            credentials: r.credentials,
            integrity: r.integrity
          });
          return o && o.oidcServerConfiguration != null && o.oidcServerConfiguration.revocationEndpoint && i.startsWith(
            o.oidcServerConfiguration.revocationEndpoint
          ) ? p.then(async (f) => {
            const E = await f.text();
            return new Response(E, f);
          }) : p.then(O(o));
        } else if (d.includes("code_verifier=") && S) {
          o = h[S], S = null;
          let k = d;
          if (o && o.codeVerifier != null) {
            const p = _.CODE_VERIFIER + "_" + o.configurationName;
            d.includes(p) && (k = k.replace(
              p,
              o.codeVerifier
            ));
          }
          return fetch(t, {
            body: k,
            method: r.method,
            headers: {
              ...C(t.headers)
            },
            mode: r.mode,
            cache: r.cache,
            redirect: r.redirect,
            referrer: r.referrer,
            credentials: r.credentials,
            integrity: r.integrity
          }).then(O(o));
        }
      }).then((d) => {
        d !== void 0 ? c(d) : (console.log("success undefined"), l(new Error("Response is undefined inside a success")));
      }).catch((d) => {
        d !== void 0 ? l(d) : (console.log("error undefined"), l(new Error("Response is undefined inside a error")));
      });
    });
    n.waitUntil(n.respondWith(u));
  }
}, Y = (n) => {
  const t = n.ports[0], i = n.data, e = i.configurationName;
  let o = h[e];
  switch (o || (h[e] = {
    tokens: null,
    state: null,
    codeVerifier: null,
    oidcServerConfiguration: null,
    oidcConfiguration: void 0,
    nonce: null,
    status: null,
    configurationName: e
  }, o = h[e], trustedDomains[e] || (trustedDomains[e] = [])), i.type) {
    case "clear":
      o.tokens = null, o.state = null, o.codeVerifier = null, o.status = i.data.status, t.postMessage({ configurationName: e });
      return;
    case "init": {
      const s = i.data.oidcServerConfiguration, a = trustedDomains[e];
      a.find((c) => c === y) || [
        s.tokenEndpoint,
        s.revocationEndpoint,
        s.userInfoEndpoint,
        s.issuer
      ].forEach((c) => {
        x(a, c);
      }), o.oidcServerConfiguration = s, o.oidcConfiguration = i.data.oidcConfiguration;
      const u = i.data.where;
      if (u === "loginCallbackAsync" || u === "tryKeepExistingSessionAsync" ? S = e : S = null, !o.tokens)
        t.postMessage({
          tokens: null,
          status: o.status,
          configurationName: e
        });
      else {
        const c = {
          ...o.tokens,
          access_token: _.ACCESS_TOKEN + "_" + e
        };
        c.refresh_token && (c.refresh_token = _.REFRESH_TOKEN + "_" + e), c.idTokenPayload && c.idTokenPayload.nonce && o.nonce != null && (c.idTokenPayload.nonce = _.NONCE_TOKEN + "_" + e), t.postMessage({
          tokens: c,
          status: o.status,
          configurationName: e
        });
      }
      return;
    }
    case "setState":
      o.state = i.data.state, t.postMessage({ configurationName: e });
      return;
    case "getState": {
      const s = o.state;
      t.postMessage({ configurationName: e, state: s });
      return;
    }
    case "setCodeVerifier":
      o.codeVerifier = i.data.codeVerifier, t.postMessage({ configurationName: e });
      return;
    case "getCodeVerifier": {
      t.postMessage({
        configurationName: e,
        codeVerifier: _.CODE_VERIFIER + "_" + e
      });
      return;
    }
    case "setSessionState":
      o.sessionState = i.data.sessionState, t.postMessage({ configurationName: e });
      return;
    case "getSessionState": {
      const s = o.sessionState;
      t.postMessage({ configurationName: e, sessionState: s });
      return;
    }
    case "setNonce":
      o.nonce = i.data.nonce, t.postMessage({ configurationName: e });
      return;
    default:
      o.items = { ...i.data }, t.postMessage({ configurationName: e });
  }
};
g.addEventListener("install", q);
g.addEventListener("activate", L);
g.addEventListener("fetch", J);
g.addEventListener("message", Y);
//# sourceMappingURL=OidcServiceWorker.js.map
