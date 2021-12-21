const fs = require('fs');
import webpack from 'webpack';
import './config/index.js';
require('dotenv').config()

export default {
  // server:{
  //   port:3000,
  //   host: '192.168.1.163'
  // },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: 'id-ID',
    },
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'viewport', content: 'user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no' },
      { property: 'fb:pages', content: '180967468710522' },
      { name: 'robots', content: 'index, follow,max-image-preview:large' },
      { name: 'og:title', content: 'og:title', content:'chatnews | Bridging Newstainment' },
      { hid: 'description', name: 'description', content: 'Bridging Newstainment' },
      { hid: 'keywords', name: 'keywords', content: 'Largest, Chatting, Application, Indonesia, Aplikasi Chatting Terbesar di Indonesia' },
      { hid: 'author', name: 'author', content: 'chatnews' },
      { hid: 'og:image', name: 'og:image', content: process.env.BASE_URL+'/favicon.ico' },
      { hid: 'og:url', name: 'og:url', content: process.env.BASE_URL },
      { 'http-equiv': 'cache-control', content: 'max-age=0, must-revalidate, no-store, no-cache' },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8; X-Content-Type-Options=nosniff' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon.ico' },
      {
        rel: "stylesheet", 
        type: 'text/css',
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
        crossorigin: true,
        defer: true
      },
      {
        rel: "stylesheet", 
        type: 'text/css',
        href: "https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/css/bootstrap.min.css",
        crossorigin: true,
        defer: true
      },
    ],
    script: [
      //{ src:'//unpkg.com/vue@latest/dist/vue.min.js', ssr: false, defer: true},
      { src:'https://code.jquery.com/jquery-3.2.1.slim.min.js', defer: true},
      { src:'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js', ssr: false, defer: true},
      { src: "/vendor/jquery/jquery.min.js" },
      { src: "vendor/bootstrap/js/bootstrap.bundle.min.js" },
      { src: "vendor/jquery-easing/jquery.easing.min.js" },
      { src: "js/sb-admin-2.min.js" }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/style.css',
    '@/assets/css/sb-admin-2.min.css',
    '@/assets/vendor/fontawesome-free/css/all.min.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/global',
    { src: '@/plugins/axios'},
    { src: '@/plugins/modal.js', ssr: false},
    { src: '@/plugins/vue-infinite-scroll.js', ssr: false},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'wp-json/indonews/v1/verifyuser',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: 'wp-json/indonews/v1/user', 
            method: 'get', 
            propertyName: false
          },
        }
      }
    },
  },

  // router: {
  //   middleware: ['authenticated']
  // },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-helmet',
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/firebase',
    '@nuxtjs/google-gtag',
    '@nuxtjs/gtm',
    'nuxt-ssr-cache',
    ['nuxt-lazy-load', {
      // Default image must be in the static folder
      defaultImage: '/images/no_image.png',
    }]
  ],

  helmet: {
    frameguard: 'sameorigin',
  },

  cache: {
    // if you're serving multiple host names (with differing
    // results) from the same server, set this option to true.
    // (cache keys will be prefixed by your host name)
    // if your server is behind a reverse-proxy, please use
    // express or whatever else that uses 'X-Forwarded-Host'
    // header field to provide req.hostname (actual host name)
    useHostPrefix: false,
    pages: [
      '/'
    ],

    pwa: {
      workbox: {
        /*
        ** Handler options: 'StaleWhileRevalidate', 'CacheFirst', 'CacheOnly', 'NetworkFirst' or 'NetworkOnly.
        ** Ref: https://web.dev/runtime-caching-with-workbox/
        ** URL Pattern use Regular Expression. Online Check: https://regex101.com/
        */
        runtimeCaching: [
          {
            urlPattern: '\/api\/',
            handler: 'NetworkFirst',
            method: 'GET'
          },
          {
            urlPattern: '\/assets\/',
            handler: 'CacheFirst',
            method: 'GET'
          }
        ]
      }
    },
    
    key(route, context) {
      // custom function to return cache key, when used previous
      // properties (useHostPrefix, pages) are ignored. return 
      // falsy value to bypass the cache
    },
    store: {
      type: 'memory',

      // maximum number of pages to store in memory
      // if limit is reached, least recently used page
      // is removed.

      max: 100,
      // number of seconds to store this page in cache
      ttl: 60,
    },
  },

  'google-gtag': {
    id: process.env.UA_ANALYTICS,
    config: {
      anonymize_ip: true, // anonymize IP
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker: {
        domains: ['https://chatnews.id/']
      }
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...).
  },

  gtm: {
    id: process.env.GTM_CODE
  },

  firebase: {
    config: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId
    },
    services: {
      messaging:{
        createServiceWorker: true,
        fcmPublicVapidKey: process.env.fcmPublicVapidKey,
        inject: fs.readFileSync('./serviceWorker.js','utf8')
      },
    }
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.BASE_URL,
    proxy: true,
    proxyHeaders: false,
    credentials: false,
  },

  // proxy: {
  //   '/api/': { target: 'https://www-development.chatnews.id/wp-json', pathRewrite: {'^/api/' : ''}, changeOrigin: true },
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ["jquery"],
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }),
    ],
  }
}