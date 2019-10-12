const React = require('react')

exports.onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
  getPostBodyComponents,
  replacePostBodyComponents,
  pathname,
}) => {
  const headComponents = getHeadComponents()
  const postBodyComponents = getPostBodyComponents()

  const isAMP = pathname.match(/\/amp\//)

  if (!isAMP) {
    headComponents.push(
      <script
        async
        src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
    )

    headComponents.push(
      <script
        dangerouslySetInnerHTML={{
          __html: `
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: 'ca-pub-3926299101061647',
            enable_page_level_ads: true
          });
        `,
        }}
      />
    )

    headComponents.push(
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="0e198b33-5bc6-4389-a18d-8cb4f013b52d";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
        }}
      ></script>
    )

    postBodyComponents.push(
      <script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js"></script>
    )

    postBodyComponents.push(
      <script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-performance.js"></script>
    )

    postBodyComponents.push(
      <script src="https://www.gstatic.com/firebasejs/7.0.0/firebase-analytics.js"></script>
    )

    postBodyComponents.push(
      <script
        dangerouslySetInnerHTML={{
          __html: `
          const firebaseConfig = {
            apiKey: "AIzaSyCGVQCTUPtpCEkAa1cSqNfXcMUEsxIZYL4",
            authDomain: "daudr-blog.firebaseapp.com",
            databaseURL: "https://daudr-blog.firebaseio.com",
            projectId: "daudr-blog",
            storageBucket: "daudr-blog.appspot.com",
            messagingSenderId: "943024764592",
            appId: "1:943024764592:web:585d290f96dfe6bf",
            measurementId: "G-HVZTBCWDG5"
          };
          firebase.initializeApp(firebaseConfig);
          const firebasePerformance = firebase.performance();
          const firebaseAnalytics = firebase.analytics();
        `,
        }}
      ></script>
    )
  }

  replaceHeadComponents(headComponents)
}
