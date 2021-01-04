<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			try {
				window.console &&
					window.console.log &&
					console.log('%c🌈🌻🌼', 'font-size:50px;')
			} catch (e) {}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import 'uview-ui/index.scss';

	page {
		color: $t-font;
	}
</style>
