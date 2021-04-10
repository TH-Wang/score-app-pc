import {
  Avatar,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Link,
  Menu,
  MenuItem,
  Icon
} from 'element-ui'

export default {
  install: function (Vue) {
    Vue.use(Avatar)
    Vue.use(Button)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Link)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Icon)
  }
}
