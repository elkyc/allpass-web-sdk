/**
 * Created by Viktor Plotnikov <viktorr.plotnikov@gmail.com>
 * Date: 12/03/2023 23:09
 */
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
  script.src = '../index.js';
  script.async = true;
  script.onload = () => init();
  document.body.appendChild(script);

  /** start verification process */
  document.getElementById('start').onclick = async () => {
    setElmsDisplay('start', 'loader');
    await window.Allpass.start(accessToken);
  };
})();
