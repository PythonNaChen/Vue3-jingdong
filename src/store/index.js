import { createStore } from 'vuex'

export default createStore({
  state: {
    cartList: {
      // 第一层级是商铺的id
      // shopId: {
      // 第二层是商品id
      // 第二层内容是商品内容以及购物数量
      //   productId: {
      //     _id: '1',
      //     name: '番茄250g/份',
      //     imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
      //     sales: 10,
      //     price: 33.6,
      //     oldPrice: 39.6,
      //     count: 2
      //   },
      // },
    }
  },
  getters: {},
  mutations: {
    changeCartItemInfo (state, payload) {
      const {
        shopId,
        productId,
        productInfo
      } = payload
      // 获取商铺信息
      let shopInfo = state.cartList[shopId]
      if (!shopInfo) {
        shopInfo = {}
      }
      // 获取商品内容以及购物数量
      let product = shopInfo[productId]
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + payload.num
      if (payload.num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      // 更新商品信息
      shopInfo[productId] = product
      // 更新商铺信息
      state.cartList[shopId] = shopInfo
    },
    // 购物车商品选中状态
    changeCartItemChecked (state, payload) {
      const {
        shopId,
        productId
      } = payload
      const product = state.cartList[shopId][productId]
      product.check = !product.check
    },
    // 清空购物车
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = {}
    },
    // 设置全选
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId]
      if (products) {
        for (const key in products) {
          const product = products[key]
          product.check = true
        }
      }
    }
  },
  actions: {},
  modules: {}
})
