<script>
export default {
  // 通过配置functional属性指定组件为函数式组件
  functional: true,
  // 组件接收的外部属性
  props: {
    avatar: {
      type: String
    }
  },
  /**
   * 渲染函数
   * @param {*} h
   * @param {*} context 函数式组件没有this, props, slots等都在context上面挂着
   */
  render(h, context) {
    const { props } = context
    if (props.avatar) {
      return <img src={props.avatar}></img>
    }
    return <img src="../assets/logo.png"></img>
  }
}
</script>