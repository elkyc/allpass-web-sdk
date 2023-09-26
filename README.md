# [Allpass.ai (by elKYC)](https://allpass.ai) Javascript Library
For full documentation, visit [https://docs.elkyc.com](https://docs.elkyc.com)
## Introduction
### Create Allpass.ai Account
In order for your application to communicate with Allpass.ai you need to signup for
an account in our [workplace](https://workplace.elkyc.com/) and retrieve your development
_API keys_ from `Integration > App Key and Secret API Key`.

You can find more details on API key configurations in the
[initial setup](https://docs.elkyc.com/elkyc-web-sdk/predefined-steps#create-allpass-account)
section of our documentation.

### Integrate the Verification Flow
Depending on your requirements, you can integrate elKYC (Allpass) via our client-side SDK.
The client-side integration process can be summarized in 3 steps:
Install and import our client-side SDK in your application
Customize UI and localisations (if needed) in your view
Initialize SDK and our users will complete a Verification through the Verification flow - on completion, you need to track the Verification in your dashboard in workplace and handle it accordingly via the callbacks (e.g. onComplete function)
You can find more details in the [initial setup](https://docs.elkyc.com/elkyc-web-sdk/predefined-steps#create-allpass-account) section of our documentation.

### Setup Webhooks
elKYC (Allpass) uses webhooks to notify your backend when an event happens in your client-side SDK. Webhooks are  useful for asynchronous events like when a user completes a Verification, or passes some step. You should specify your backend endpoint url and import public RSA key
You can find more details in the initial setup section of our documentation and how to use it
in [webhooks](https://docs.elkyc.com/elkyc-web-sdk/webhooks) section. 

## Installation
### Import library to your web application
Start by adding the minified code to your webpage from the unpkg CDN in your HTML file:
```html
<script
 type="text/javascript"
 src="https://unpkg.com/@allpass/web-sdk"
></script>
```
Or you can install it via npm:
```bash
npm install @allpass/web-sdk
```
And then import it in your code:
```javascript
import Allpass from '@allpass/web-sdk';
```

## Initialize SDK
You can pass in different handler functions like the onLoad, onStart, onRestart, onPassStep, onComplete or onError method to handle different events of the verification flow to the init function.
```javascript
let onLoad: () => void;
```
Method that is being called once a verification flow is loaded. You can use this to show your own loader and then show **div allpass**.
```javascript
let onStart: (event: {
  appKey: string;
  transactionId: string;
  clientSession?: string;
}) => void;
```
Method that is being called once a user starts the verification flow.
- **appKey**: API Key
- **transactionId**: UUID of the verification.  You can use this to query our API.
- **clientSession**: Client session (requestID) identifier in your system
```javascript
let onRestart: (event: {
  appKey: string;
  transactionId: string;
  clientSession?: string;
}) => void;
```
Method that is being called once a user starts the verification flow, but the  verification is not completed
- **appKey**: API Key
- **transactionId**: UUID of the verification.  You can use this to query our API.
- **clientSession**: Client session identifier (requestID) in your system
```javascript
let onPassStep: (event: {
  appKey: string;
  transactionId: string;
  stepType: string;
  clientSession?: string;
}) => void;
```
Method that is being called once a user pass any step of the verification flow.
- **stepType**:The step can be one of the following
"intro" | "biometry" | "documents" | "scan" | "diia" | "complete"
- **appKey**: API Key
- **transactionId**: UUID of the verification.  You can use this to query our API.
- **clientSession**: Client session identifier (requestID) in your system
```javascript
let onComplete: (event: {
  appKey: string;
  transactionId: string;
  clientSession?: string;
}) => void;
```
Method that is being called once the verification is completed.
- **appKey**: API Key
- **transactionId**: UUID of the verification.  You can use this to query our API.
- **clientSession**: Client session identifier (requestID) in your system
```javascript
let onError: (event: {
  appKey: string;
  transactionId: string;
  error: string;
  stepType?: string;
  clientSession?: string;
}) => void;
```
- **error**: The reason why the flow failed.
- **stepType**: The step where the error occurred, can be undefined or one of the following
"intro" | "biometry" | "documents" | "scan" | "diia" | "complete"
- **appKey**: API Key
- **transactionId**: UUID of the verification.  You can use this to query our API.
- **clientSession**: Client session identifier (requestID) in your system

```javascript
Allpass.init({
  onLoad: () => {},
  onRestart: ({appKey, transactionId, clientSession}) => {},
  onStart: ({appKey, transactionId, clientSession}) => {},
  onPassStep: ({appKey, transactionId, stepType, clientSession}) => {},
  onComplete: ({appKey, transactionId, clientSession}) => {},
  onError: ({appKey, transactionId, error, stepType, clientSession}) => {},
});
```

**_If user doesn't finish verification process and current session is still active - we can automatically start this verification. In order to make it you should call restart after init method._**
```javascript
Allpass.restart();
```
Also it could be chaining with an init method:
```javascript
Allpass
  .init({onComplete: ({appKey, transactionId, clientSession}) => {}})
  .restart();
```

## Render SDK
Place the new HTML element where you want the component to render inside the body of your HTML file:
```html
<div id="allpass"></div>
```
In order for the verification flow to render correctly, you'll need to pass a valid **accessToken** as an argument to the start function. You can get **accessToken** from our public API. You can find more details in the [Public API](https://redoc.elkyc.com/#tag/Public-Api-Verification-Gateway-Service/operation/ApiVerificationController_createVerificationToken) section of our documentation.
```javascript
const accessToken = 'ACCESS_TOKEN_FROM_PUBLIC_API';

Allpass.start(accessToken);
```
**_Make sure you're using your public App Key for this client-side SDK_**

### Example
index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="favicon.ico">
    <title>Title</title>
</head>
<body>
<div id="app">
    <div id="header">
        <h1>My Test Application</h1>
    </div>
    <div id="container">
        <div>
            <h3>Content</h3>
            <img id="loader" alt="loader" style="display: none" src="loader.gif"/>
            <button id="start">Start Verification</button>
        </div>
        <div id="allpass"></div>
    </div>
    <div id="footer">
        <p>Footer</p>
    </div>
    <script src="integration.js" async></script>
</div>
</body>
</html>
```
integration.js
```javascript
const accessToken = 'ACCESS_TOKEN_FROM_PUBLIC_API';

(() => {
  const allpassId = 'allpass';
  /** UI actions */
  const setElmsDisplay = (hide, show) => {
    document.getElementById(hide).style.display = 'none';
    document.getElementById(show).style.display = 'block';
  }
  const finishUI = () => {
    setTimeout(() => {
      setElmsDisplay(allpassId, 'start');
      window.Allpass.close();
    }, 10000);
  };

  /** event handlers */
  const onLoad = (e) => {
    console.log('onLoad', e);
    setElmsDisplay('loader', allpassId);
  };
  const onRestart = (e) => {
    console.log('onRestart', e);
    setElmsDisplay('start', 'loader');
  };
  const onStart = (e) => {
    console.log('onStart', e);
  };
  const onPassStep = (e) => {
    console.log('onPassStep', e);
  };
  const onComplete = (e) => {
    console.log('onComplete', e);
    finishUI();
  };
  const onError = (e) => {
    console.log('onError', e);
    finishUI();
  };

  /** initialize Allpass SDK */
  const init = () => {
    window.Allpass.init({
      onLoad,
      onRestart,
      onStart,
      onPassStep,
      onComplete,
      onError,
    }).restart();
  };

  /** create Allpass library */
  const script = document.createElement('script');
  script.src = 'https://unpkg.com/@allpass/web-sdk';
  script.async = true;
  script.onload = () => init();
  document.body.appendChild(script);

  /** start verification process */
  document.getElementById('start').onclick = async () => {
    setElmsDisplay('start', 'loader');
    await window.Allpass.start(accessToken);
  };
})();
```