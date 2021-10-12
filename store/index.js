export const state = () => ({
	token: '',
	tokenimq: '',
	news: {},
	urlPath: '',
	menus: [],
	topTopic: [],
	identity: {},
	popular: [],
	userData: {},
	stickerNews: [],
	checkEvent: {},
	bannerEvent: {}
});

export const mutations = {
	SET_TOKEN(state, token) {
		state.token = token
	},
	SET_TOKEN_IMQ(state, tokenimq) {
		state.tokenimq = tokenimq
	},
	SET_NEWS(state, news) {
		state.news = news
	},
	SET_URLPATH(state, urlPath) {
		state.urlPath = urlPath
	},
	SET_MENUS(state, menus) {
  		state.menus = menus
	},
	SET_TOP_TOPIC(state, topTopic) {
  		state.topTopic = topTopic
	},
  	SET_IDENTITY(state, identity) {
  		state.identity = identity
	},
	SET_POPULAR(state, popular) {
  		state.popular = popular
	},
	SET_USER_DATA(state, userData) {
  		state.userData = userData
	},
	SET_STICKER_NEWS(state, stickerNews) {
  		state.stickerNews = stickerNews
	},
	SET_CHECK_EVENT(state, checkEvent) {
  		state.checkEvent = checkEvent
	},
	SET_BANNER_EVENT(state, bannerEvent) {
  		state.bannerEvent = bannerEvent
	}
};

export const getters = {
	token(state) {
  		return state.token;
	},
	tokenimq(state) {
		return state.tokenimq;
  	},
	menus(state) {
  		return state.menus;
	},
	topTopic(state) {
  		return state.topTopic;
	},
	identity(state) {
	   return state.identity;
	},
	popular(state) {
  		return state.popular;
	},
	userData(state) {
		return state.userData;
	},
	stickerNews(state) {
		return state.stickerNews;
	},
	checkEvent(state) {
		return state.checkEvent;
	},
	bannerEvent(state) {
		return state.bannerEvent;
	}
};

export const actions = {
	async nuxtServerInit ({ commit, store, dispatch }, { req }) {
	 	const server = process.env.BASE_API_URL;
	 	let datas = {
		    'username' : 'dery',
		    'password' : 'NGebbEM9dEGx60DqBJagUjyc'
		}

		let datasimq = {
		    'username' : 'indochat',
		    'password' : 'indochat@15.com'
		}

		const requestOptions = {
		    method: "POST",
		    headers: { "Content-Type": "application/json" },
		    body: JSON.stringify(datas)
	  	};

		const requestOptionsimq = {
		    method: "POST",
		    headers: { "Content-Type": "application/json" },
		    body: JSON.stringify(datasimq)
	  	};

		let getToke = await fetch(server+`jwt-auth/v1/token`, requestOptions).then(res => res.json())
		let token = getToke.token
		commit('SET_TOKEN', getToke.token)

		let getTokeimq = await fetch(`https://www.satukanegeri.com/api/auth/login`, requestOptionsimq).then(res => res.json())
		let tokenimq = getTokeimq.token
		commit('SET_TOKEN_IMQ', getTokeimq.token)

		let urlMenu = server+`indonews/v1/menus`
		let getDataMenu = await fetch(urlMenu, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
		commit('SET_MENUS', getDataMenu)

		let urlEvent = server+`indonews/v1/check-event`
		let getDataEvent = await fetch(urlEvent, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
		commit('SET_CHECK_EVENT', getDataEvent)

		if (getDataEvent.data.length > 0) {
			var arrEvent = getDataEvent.data
	  		for(var i = 0; i < arrEvent.length;i++){
	        	if (arrEvent[i].type == 'page') {
	          		let urlOlimpic = server+`indonews/v1/${arrEvent[i].endpoint}`
	          		let dataOlimpic = await fetch(urlOlimpic, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
	          		commit('widget/SET_LISTOLIMPIC', dataOlimpic)
	        	}else if (arrEvent[i].type == 'theme') {
	        		if (arrEvent[i].details != null) {
	        			commit('SET_BANNER_EVENT', arrEvent[i].details)
	        		}else{
	        			commit('SET_BANNER_EVENT', [])
	        		}
	        	}
	      	}
		}else{
			commit('SET_BANNER_EVENT', [])
		}

		let urlTagMenu = server+`indonews/v1/tags-menus`
		let getDataTagMenu = await fetch(urlTagMenu, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
		commit('SET_TOP_TOPIC', getDataTagMenu)

		let urlStickerNews = server+`indonews/v1/sticker-news`
		let getDataStickerNews = await fetch(urlStickerNews, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
		commit('SET_STICKER_NEWS', getDataStickerNews)

		let urlAds = server+`indonews/v1/ads`
		let getDataAds = await fetch(urlAds, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
		commit('ads/SET_ADS', getDataAds)

		let urlIdentity = server+`indonews/v1/identity`
		let getDataIdentity = await fetch(urlIdentity, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
		commit('SET_IDENTITY', getDataIdentity)

		let urlPopularPost = server+`indonews/v1/popular-posts`
		let getDataPopularPost = await fetch(urlPopularPost, { headers: {"Authorization" : `Bearer ${token}`} }).then(res => res.json())
		commit('SET_POPULAR', getDataPopularPost)
  	}
};