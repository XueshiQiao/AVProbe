<script setup>
import { ref } from 'vue';
import BasicMediaInfo from './BasicMediaInfo.vue';
import PacketsTableView from './PacketsTableView.vue';
</script>
<script>


export default {
	name: 'Header',
	// life cycle method
	created() {
		console.log("Header.vue created");
		window.addEventListener('message', async e => {
			const { type, body, requestId } = e.data;
			switch (type) {
				case 'init':
					{
						console.log("Header.vue hello world from vscode extension, body: ", body);
						this.filePath = body['filePath'] ?? ""
						this.fileSize = Number(body['fileSize']) ?? 0
						return;
					}
			}
		})
	},
	data() {
		return {
			filePath: ref(""),
			fileSize: ref("0 MB"),
			isInfoVisible: ref(false),
			size: ref('default'),
			gapSize : ref('small'),
			customGapSize : ref(0),
		}
	},
	methods: {
		showInformation() {
			this.isInfoVisible = true;
			vscode.postMessage({ type: 'probe' });
		},
		showPackets() {
			// Logic to show packets would go here
			// vscode.postMessage({ type: 'show_packets', streamType: streamType });
		},
	}
}
</script>

<template>
  <a-row>
    <a-col :span="24">
			<a-card title="Basic Info">
				<a-descriptions title="" bordered size="small">
					<a-descriptions-item label="Path">{{ filePath }}</a-descriptions-item>
					<a-descriptions-item label="Size">{{ fileSize / 1000.0 / 1000.0 }} MB</a-descriptions-item>
				</a-descriptions>
			</a-card>
    </a-col>
  </a-row>
	<a-row>
		<a-space size="middle">
			<a-button type="primary" @click="showInformation">Show Information</a-button>
			<a-select v-model="option" placeholder="Select an option">
				<a-select-option value="all" select>All</a-select-option>
				<a-select-option value="audio">Audio</a-select-option>
				<a-select-option value="video">Video</a-select-option>
			</a-select>
			<a-button @click="showPackets">Show Packets</a-button>
		</a-space>
	</a-row>

  <a-row>
    <a-col :span="24">
      <a-divider/>
      <div v-if="isInfoVisible" class="info-display">
        <a-card>
          <p>No specific information to display.</p>
        </a-card>
      </div>
      <a-divider/>
    </a-col>
  </a-row>

	<a-divider/>
	<BasicMediaInfo />
	<PacketsTableView />
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
