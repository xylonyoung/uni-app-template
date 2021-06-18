import $api from './request'

export default async function wechatPay(id) {
  const params = { gateway: 'JSAPI' }
  //#ifndef MP-WEIXIN
  params.gateway = 'MWEB'
  //#endif

  const { data } = await $api
    .post(`/api/invoices/${id}/pay/wechat`, params)
    .catch(() => {
      uni.hideLoading()
    })

  const { jssdk, payment } = data

  return new Promise((resolve, reject) => {
    //#ifdef MP-WEIXIN
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: jssdk.timestamp,
      nonceStr: jssdk.nonceStr,
      package: jssdk.package,
      signType: jssdk.signType,
      paySign: jssdk.paySign,
      success(res) {
        console.log('success:' + JSON.stringify(res))
        uni.hideLoading()
        uni.showToast({
          title: '支付成功'
        })
        resolve()
      },
      fail(err) {
        console.log('fail:' + JSON.stringify(err))
        uni.hideLoading()
        uni.showToast({
          title: '支付失败',
          icon: 'none'
        })
        reject()
      }
    })
    //#endif

    //#ifndef MP-WEIXIN
    location.href = payment?.mweb_url
    //#endif
  })
}
