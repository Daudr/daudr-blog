import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html lang="en" {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no"
        />
        <meta
          name="monetization"
          content="$coil.xrptipbot.com/C3adA1B9Q5qMu4Z3i4Bfhw"
        />
        {props.headComponents}

        <script
          async
          src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        ></script>
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
        <script async custom-element="amp-auto-ads"
                src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js">
        </script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `window.$crisp=[];window.CRISP_WEBSITE_ID="0e198b33-5bc6-4389-a18d-8cb4f013b52d";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
          }}
        ></script>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
