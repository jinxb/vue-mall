import Toast from './Toast.vue'
const obj = {}
obj.install = Vue => {
	// 1.创建组件构造器
	const toastComp = Vue.extend(Toast);
	// 2.利用new的方式，根据组件构造器，创建出来一个组件对象
	const toast = new toastComp();
	// 3.挂载到某个元素上
	toast.$mount(document.createElement('div'))
	// 4.放到body上
	document.body.appendChild(toast.$el)
	Vue.prototype.$toast = toast
}
export default obj