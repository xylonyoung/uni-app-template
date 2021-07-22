const state = {
  ORDER_STATUS: [
    { label: '失败', value: '-2' },
    { label: '已取消', value: '-1' },
    { label: '等待', value: '0' },
    { label: '待支付', value: '1' },
    { label: '待发货', value: '2' },
    { label: '待收货', value: '3' },
    { label: '已收货', value: '4' },
    { label: '完成', value: '5' },
    { label: '售后中', value: '6' }
  ]
}

const actions = {}

export default {
  state,
  actions
}
