<template>
	<div class="docs-layout">
		<slot></slot>
	</div>
</template>
<script lang="ts">
	import Vue from "vue";

	export default Vue.extend({
		created: function(){
			//path = this.path;
		},
		mounted: function(){
		},
		props: {
			path: String
		}
	})
</script>
<style scoped>
	.docs-layout{
		display: flex;
		justify-content: space-around;
		flex:1;
		padding:20px 0;
	}

	.docs-layout > div:first-child{
		flex:1;
		padding:0 20px;
		box-sizing: border-box;
	}
</style>