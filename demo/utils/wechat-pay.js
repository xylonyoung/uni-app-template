import $api from '@/api'
export default async function wechatPay(id) {
  uni.showLoading()
  const { data } = await $api.post(`/api/invoices/${id}/pay/wechat`, {
    gateway: 'JSAPI'
  })
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: data.jssdk.timestamp,
      nonceStr: data.jssdk.nonceStr,
      package: data.jssdk.package,
      signType: data.jssdk.signType,
      paySign: data.jssdk.paySign,
      success: res => {
        console.log('success:' + JSON.stringify(res))
        uni.hideLoading()
        uni.showToast({
          title: '支付成功'
        })
        resolve()
      },
      fail: err => {
        console.log('fail:' + JSON.stringify(err))
        uni.hideLoading()
        uni.showToast({
          title: '支付失败',
          icon: 'none'
        })
        reject()
      }
    })
  })
}
