<script setup>
import { ref } from "vue";
import BasicMediaInfo from "./BasicMediaInfo.vue";
import PacketsTableView from "./PacketsTableView.vue";
</script>
<script>
export default {
	name: "Header",
	props: {
		message: {
			type: String,
			required: false,
			default: 'Hello, world!'
		}
	},
  // life cycle method
  created() {
		console.log("Header.vue created");
		this.options = ref([{
			label: 'All Streams',
			value: 'All Streams'
		}, {
			label: 'Audio',
			value: 'Audio'
		}, {
			label: 'Video',
			value: 'Video'
		}])
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
          }
          return;
        };
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
			selectedOption: ref(''),
			// ----------------
			mediaInfo: ref({}),
      formatInfo: ref({}),
			streamsInfo: ref([]),
			// ----------------
    };
  },
  methods: {
    showInformation() {
      this.isInfoVisible = true;
      vscode.postMessage({ type: "probe" });
    },
    showPackets() {
      // Logic to show packets would go here
			// vscode.postMessage({ type: 'show_packets', streamType: streamType });
			console.log("showPackets: ", this.selectedOption);
    },
  },
};
</script>

<template>
  <a-row>
    <a-col :span="24">
      <a-card title="Basic Info">
        <a-descriptions title="" bordered size="small" :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
          <a-descriptions-item label="Path">{{ fileInfo['filePath'] }}</a-descriptions-item>
          <a-descriptions-item label="Size"
            >{{ fileInfo['fileSize'] / 1000.0 / 1000.0 }} MB</a-descriptions-item
          >
        </a-descriptions>
      </a-card>
    </a-col>
  </a-row>
  <a-row>
    <a-space size="middle">
      <a-button type="primary" @click="showInformation">Show Information</a-button>
      <a-select :options="options" v-model:value="selectedOption">
        <a-select-option value="all" select>All</a-select-option>
        <a-select-option value="audio">Audio</a-select-option>
        <a-select-option value="video">Video</a-select-option>
      </a-select>
      <a-button @click="showPackets">Show Packets</a-button>
    </a-space>
  </a-row>

  <!-- <a-row>
    <a-col :span="24">
      <a-divider />
      <div v-if="isInfoVisible" class="info-display">
        <a-card>
          <p>No specific information to display.</p>
        </a-card>
      </div>
      <a-divider />
    </a-col>
  </a-row> -->

  <a-divider />
  <BasicMediaInfo :formatInfo="formatInfo" :streamsInfo="streamsInfo" />
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
