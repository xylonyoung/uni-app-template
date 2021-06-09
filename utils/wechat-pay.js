import $api from '@/api'
import { jsSdkPay } from './JS-SDK'

export default async function wechatPay(id) {
  uni.showLoading()

  const params = { gateway: 'JSAPI' }
  //#ifdef H5
  params.gateway = 'MWEB'
  //#endif

  const { data } = await $api
    .post(`/api/invoices/${id}/pay/wechat`, params)
    .catch(() => {
      uni.hideLoading()
    })

  const { jssdk } = data

  return new Promise((resolve, reject) => {
    //#ifdef MP-WEIXIN
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: jssdk.timestamp,
      nonceStr: jssdk.nonceStr,
      package: jssdk.package,
      signType: jssdk.signType,
      paySign: jssdk.paySign,
      success,
      fail
    })
    //#endif

    //#ifdef H5
    jsSdkPay({ ...jssdk, aPackage: jssdk.package, success, fail })
    //#endif

    function success(res) {
      console.log('success:' + JSON.stringify(res))
      uni.hideLoading()
      uni.showToast({
        title: '支付成功'
      })
      resolve()
    }

    function fail(err) {
      console.log('fail:' + JSON.stringify(err))
      uni.hideLoading()
      uni.showToast({
        title: '支付失败',
        icon: 'none'
      })
      reject()
    }
  })
}
