

export function menu(value) {
  // function filterAsyncRouter(value) {
    return value.filter(route => {
      if (route.component) {
        // Layout ParentView 组件特殊处理
        if (route.component === 'Layout') {
          route.component = Layout
        } else if (route.component === 'Console') {
          route.component = Console
        } else {
          route.component = loadView(route.component)
        }
      }
  
      if (route.children != null && route.children && route.children.length) {
        route.children = menu(route.children)
      }
      return true
    })
    // console.log(value)
  // }
  
}
export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}
