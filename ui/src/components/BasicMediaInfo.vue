<script setup>
import { ref } from 'vue';
</script>
<script>
export default {
	created() {
		console.log("BasicMediaInfo.vue created");
		window.addEventListener('message', async e => {
			const { type, body, requestId } = e.data;
			switch (type) {
				case 'media_info':
					{
						this.mediaInfo = JSON.parse(body);
						console.log("BasicMediaInfo Receive 'media_info' message from vscode extension, body: ", body);
						console.log("BasicMediaInfo Receive 'media_info' message from vscode extension, mediaInfo: ", this.mediaInfo);
						// debugger;
						if (this.mediaInfo && this.mediaInfo['format'] !== undefined) {
							this.formatInfo = Object.fromEntries(
								Object.entries(this.mediaInfo['format']).filter(([key, value]) => {
									console.log("key:", key, ":", value)
									return key !== 'filename';
								})
							);
						}
						if (this.mediaInfo && this.mediaInfo['streams'] !== undefined) {
							this.streamsInfo = this.mediaInfo['streams'];
						}
						return;
					}
			}
		})
	},

	data() {
		return {
			mediaInfo: ref({}),
			formatInfo: ref({}),
			streamsInfo: ref([]),
		}
	},
	methods: {

	}
};
</script>
<template>
	<div>Basic Info</div>
	<a-card title="Basic Media Info">
		<!-- check whether formatInfo is empty:  -->
		<a-descriptions title="" bordered size="small" v-if="Object.keys(formatInfo).length > 0">
			<!-- iterator all key values in mediaInfo['format'] -->
			<a-descriptions-item v-for="(value, key) in formatInfo" :key="key" :label="key" v-if="key !== 'filename'">{{ value }}</a-descriptions-item>
		</a-descriptions>
	</a-card>
	<a-card>

	</a-card>
</template>
