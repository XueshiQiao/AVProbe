<script setup>
import { ref } from "vue";
import BasicMediaInfo from "./BasicMediaInfo.vue";
import PacketsTableView from "./PacketsTableView.vue";
import { TableOutlined, FilterOutlined } from '@ant-design/icons-vue';
</script>
<script>
export default {
	name: "Header",
	props: {
	},
  // life cycle method
  created() {
		console.log("Header.vue created");
		this.options = ref([{
			label: 'All Streams',
			value: '-1'
		}]);
		this.selectedOption = ref(this.options[0].value)

    window.addEventListener("message", async (e) => {
      const { type, body, requestId } = e.data;
			console.log("Header.vue Receive ", type, " message from vscode extension, body: ", body)
      switch (type) {
				case "init": {
					console.log("Header.vue hello world from vscode extension, body: ", body);
					// how to update ref(*) type value?
					// this.filePath.value = body["filePath"] ?? "";
					// this.fileSize = Number(body["fileSize"]) ?? 0;
					this.fileInfo['filePath'] = body["filePath"] ?? "";
					this.fileInfo['fileSize'] = Number(body["fileSize"]) ?? 0;
					console.log("Header.vue filePath: ", this.filePath, ", fileSize: ", this.fileSize);

					this.showInformation();
					return;
				};
				case "media_info": {
          this.mediaInfo = JSON.parse(body);
          console.log(
            "Header.vue Receive 'media_info' message from vscode extension, body: ",
            body
          );
          console.log(
            "Header.vue Receive 'media_info' message from vscode extension, mediaInfo: ",
            this.mediaInfo
          );
          // debugger;
          if (this.mediaInfo && this.mediaInfo["format"] !== undefined) {
            this.formatInfo = Object.fromEntries(
              Object.entries(this.mediaInfo["format"]).filter(([key, value]) => {
                console.log("key:", key, ":", value);
                return key !== "filename";
              })
            );
          }
          if (this.mediaInfo && this.mediaInfo["streams"] !== undefined) {
						this.streamsInfo = this.mediaInfo["streams"];
						this.streamsInfo.forEach((stream, index) => {
							stream["key"] = index.toString();
							debugger;
							if (this.options.findIndex((option) => option.value === stream["index"]) === -1) {
								this.options.push({
									label: stream["codec_type"] + "-" + stream["index"],
									value: stream["index"]
								});
							}
						});
          }
          return;
				};
				case "packets": {
					const packetsDict = JSON.parse(body);
					if (packetsDict && packetsDict["packets"] !== undefined && Array.isArray(packetsDict["packets"])) {
						this.packetsInfo = packetsDict["packets"];
						this.packetsInfo.forEach((packet, index) => {
							packet["key"] = index.toString();
						});
					}
					console.log("Header.vue Receive 'packets' message from vscode extension, packets: ", this.packetsInfo);
					return
				}
      }
		});

		vscode.postMessage({ type: 'ready' });
  },
  data() {
    return {
			fileInfo: ref({}),
      isInfoVisible: ref(false),
      size: ref("default"),
      gapSize: ref("small"),
			customGapSize: ref(0),
			options: ref([]),
			selectedOption: ref(-1),
			// ----------------
			mediaInfo: ref({}),
      formatInfo: ref({}),
			streamsInfo: ref([]),
			packetsInfo: ref([]),
			// ----------------
    };
  },
  methods: {
    showInformation() {
      vscode.postMessage({ type: "probe" });
    },
    showPackets() {
			console.log("showPackets: ", this.selectedOption);
			vscode.postMessage({ type: 'show_packets', streamIndex: this.selectedOption });
    },
  },
};
</script>

<template>
	<a-flex gap="middle" vertical>
		<a-row>
			<a-col :span="24">
				<a-card title="Media file">
					<a-descriptions title="" bordered size="small" :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
						<a-descriptions-item label="Path">{{ fileInfo['filePath'] }}</a-descriptions-item>
						<a-descriptions-item label="Size"
							>{{ (fileInfo['fileSize'] / 1000.0 / 1000.0).toFixed(2) }} MB ({{ fileInfo['fileSize'] }} bytes)</a-descriptions-item
						>
					</a-descriptions>
				</a-card>
			</a-col>
		</a-row>

		<a-row>
			<a-space size="middle">
				<!-- <a-button type="primary" @click="showInformation">Show Information</a-button> -->
				<a-select :options="options" v-model:value="selectedOption">
					<a-select-option value="all" select>All</a-select-option>
					<a-select-option value="audio">Audio</a-select-option>
					<a-select-option value="video">Video</a-select-option>
				</a-select>
				<a-button @click="showPackets">
					<template #icon>
						<TableOutlined />
					</template>
					Show packets
				</a-button>
			</a-space>
		</a-row>

		<a-flex gap="small">
			<BasicMediaInfo :formatInfo="formatInfo" :streamsInfo="streamsInfo"  />
			<PacketsTableView :packetsInfo="packetsInfo" />
		</a-flex>
	</a-flex>
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
