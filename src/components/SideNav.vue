<template>
	<div class="side-nav">
		<ul class="nav-wrap">
			<li class="nav-item" v-for="(nav, i) in navsData.component.groups" :key="i">
				<h4>{{nav.name}}</h4>
				<ul class="subnav-wrap">
					<li class="subnav-item" v-for="(subnav, j) in nav.list" :key="j">
						<router-link
							:to="navsData.component.path + subnav.path"
							exact
							v-text="subnav.title"
						></router-link>	
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		props: {
			navsData: Object
		}
	})
</script>
<style scoped>

</style>