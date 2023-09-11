window.Allpass=(()=>{const e="https://verification.allpass.ai",t="https://billing.elkyc.com",n="1.0.12",s="allpass";let o={};const a=`${s}Session_`,i=e=>a+e,r=e=>!e||Date.now()>=1e3*JSON.parse(atob(e.split(".")[1])).exp,l=function(e,t,n){let s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"post";n=n||{};const o=new XMLHttpRequest;o.open(s,e,!0);for(const e in n)n.hasOwnProperty(e)&&o.setRequestHeader(e,n[e]);return o.setRequestHeader("Content-Type","application/json"),o.send(JSON.stringify(t)),new Promise(((e,t)=>{o.onload=()=>{if(o.status>=200&&o.status<300){const n=JSON.parse(o.response);if(n&&n.status)return e(n);t(n.error)}else t(o.statusText)},o.onerror=()=>t(o.statusText)}))},c=(e,t)=>{const n=i(e);let s=sessionStorage.getItem(n);if(s){if(s=JSON.parse(s),!r(s.sessionToken)&&t===s.clientSession)return s;sessionStorage.removeItem(n)}return null},d=t=>{const{sessionToken:n,lang:a}=t,i=document.getElementById(s);if(!i)throw new Error(`Element with id "${s}" not found`);i.innerHTML="";const r=document.createElement("meta");r.name="viewport",r.content="width=device-width, initial-scale=1",document.getElementsByTagName("head")[0].appendChild(r),i.style.minHeight="min-content",i.style.position="relative",i.style.overflow="hidden",i.style.paddingTop=`${Math.max(document.documentElement.clientHeight,650)}px`,i.style.display="none";const l=document.createElement("iframe");l.src=`${e}/${n}?isFrame=1&${a?`lang=${a}`:""}`,l.allow="camera *",l.onload=o.onLoad,l.style.position="absolute",l.style.top="0",l.style.left="0",l.style.width="100%",l.style.height="100%",l.style.border="0",i.appendChild(l)},p=e=>{const{height:t}=e||document.documentElement.clientHeight;document.getElementById(s).style.paddingTop=t};return window.addEventListener("message",(t=>{if(t.origin===e&&t.data&&t.data.type&&o[t.data.type]){switch(t.data.type){case"onComplete":case"onError":t.data.appKey&&sessionStorage.removeItem(i(t.data.appKey))}o[t.data.type](t.data)}})),()=>({init:function(e){let{onLoad:t,onRestart:n,onStart:s,onPassStep:a,onComplete:i,onError:r}=e;return o={onLoad:t,onRestart:n,onStart:s,onPassStep:a,onComplete:i,onError:r,onChangeIframe:p},this},start:async(e,o,a)=>{const p=await(async(e,o,a)=>{let d=c(e,o);return d||(d=await(async(e,o,a)=>{const i=await(async e=>{const o=`${s}Token_${e}`;let a=sessionStorage.getItem(o);if(!r(a))return a;const i=await l(`${t}/api/sdk/auth/signIn`,{appKey:e,sdkVersion:n});if(!i.data||!i.data.access_token)throw new Error("Authentication failed");return a=i.data.access_token,sessionStorage.setItem(o,a),a})(e),c=await l(`${t}/api/browser`,{clientSession:o,lang:a},{Authorization:`Bearer ${i}`});if(!c.data||!c.data.accessToken)throw new Error("Create new session failed");return{sessionToken:c.data.accessToken,clientSession:o,lang:a}})(e,o,a),sessionStorage.setItem(i(e),JSON.stringify(d))),d})(e,o,a);d(p)},restart:e=>{for(const t in sessionStorage){if(0!==t.indexOf(a))continue;const n=c(t.replace(a,""),e);if(n)return o.onRestart(n),d(n)}},clearSessions:()=>{for(const e in sessionStorage)0===e.indexOf(a)&&sessionStorage.removeItem(e)},getVersion:()=>n,close:()=>{const e=document.getElementById(s);e&&(e.innerHTML="")}})})()();