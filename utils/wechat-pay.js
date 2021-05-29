import $api from '@/api'
export default async function wechatPay(id) {
  uni.showLoading()
  const res = await $api.post(`/api/invoices/${id}/pay`, {
    method: 'WECHAT',
    tradeType: 'JSAPI'
  })
  return new Promise((resolve, reject) => {
    uni.requestPayment({
      provider: 'wxpay',
      timeStamp: res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.packageValue,
      signType: res.signType,
      paySign: res.paySign,
      success: (res) => {
        console.log('success:' + JSON.stringify(res))
        uni.hideLoading()
        uni.showToast({
          title: '支付成功'
        })
        resolve()
      },
      fail: (err) => {
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
