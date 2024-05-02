<script setup>
import { ref } from "vue";
import PacketsTableView from "./PacketsTableView.vue";
import {
  InfoCircleFilled,
  AudioFilled,
  VideoCameraFilled,
  FileTextFilled,
  ProfileFilled,
} from "@ant-design/icons-vue";
import { theme } from "ant-design-vue";
</script>
<script>
export default {
  props: {
    formatInfo: {
      type: Object,
      required: true,
      default: {},
    },
    streamsInfo: {
      type: Array,
      required: true,
      default: [],
    },
    packetsInfo: {
      type: Array,
      required: true,
      default: [],
    },
    options: {
      type: Array,
      required: true,
      default: [],
    },
  },
  watch: {
    packetsInfo(newPacketsInfo) {
      console.log("packetsInfo updated:", newPacketsInfo);
      this.packets = newPacketsInfo.filter(this.packetFilter);
    },
  },
  created() {
    console.log("BasicMediaInfo.vue created");

    window.addEventListener("message", async (e) => {
      const { type, body, requestId } = e.data;
      switch (type) {
        case "bmp_frame": {
          console.log(
            "BasicMediaInfo.vue status: ",
            body.status,
            ", pts: ",
            body.pts,
            ", bmp_frame: ",
            body.base64ImageData
          );
          this.framePts = body.pts;
          this.base64ImageData = "data:image/bmp;base64, " + body.base64ImageData;
          return;
        }
        case "extension_options": {
          console.log("BasicMediaInfo.vue Receive 'extension_options' message from vscode extension, body: ", body);
          this.tablePageSize = body.tablePageSize;
          return;
        }
      }
    });

    vscode.postMessage({ type: "get_extension_options" });
  },
  mounted() {
    console.log("BasicMediaInfo.vue mounted, load all packets info.");
    console.log("default page size: ", this.tablePageSize);
    this.showPackets();
  },
  data() {
    return {
      descriptionColumn: { xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 },
      activeKey: ref("0"),
      columns: ref([
        {
          title: "codec_type",
          dataIndex: "codec_type",
          key: "codec_type",
        },
        {
          title: "pts",
          dataIndex: "pts",
          key: "pts",
        },
        {
          title: "pts_time",
          dataIndex: "pts_time",
          key: "pts_time",
        },
        {
          title: "dts",
          dataIndex: "dts",
          key: "dts",
        },
        {
          title: "dts_time",
          dataIndex: "dts_time",
          key: "dts_time",
        },
        {
          title: "duration",
          dataIndex: "duration",
          key: "duration",
        },
        {
          title: "duration_time",
          dataIndex: "duration_time",
          key: "duration_time",
        },
        {
          title: "size",
          dataIndex: "size",
          key: "size",
        },
        {
          title: "pos",
          dataIndex: "pos",
          key: "pos",
        },
        {
          title: "flags",
          dataIndex: "flags",
          key: "flags",
        },
      ]),
      selectedOption: ref("-1"),
      theme: theme,
      base64ImageData: ref(""),
      shouldShowFrame: ref(false),
      loadedFrame: ref(false),
      framePts: ref(""),
      showPacketPanelKey: ref("packet_info"),
      tablePageSize: ref(10),
      toggle_key_frames_options: [
        { label: "--- No Filter ---", value: 0 },
        { label: "Key Frames Only", value: 1 },
      ],
      show_key_frames_only: 0,
      packetFilter: function (packet) {
        return true;
      },
      packets: ref([]),
    };
  },
  methods: {
    showPackets() {
      console.log("showPackets: ", this.selectedOption);
      vscode.postMessage({ type: "show_packets", streamIndex: this.selectedOption });
    },

    toggle_key_frames() {
      console.log("toggle_key_frames: ", this.show_key_frames_only);
      this.packetFilter = (packet) => {
        if (this.show_key_frames_only === 1) {
          return packet.flags.includes("K");
        } else {
          return true;
        }
      };
      this.showPackets();
    },

    showFrame(record) {
      vscode.postMessage({ type: "show_frame", framePts: record.pts_time });
      this.framePts = record.pts_time;
      this.shouldShowFrame = true;
    },

    onFrameWindowDismiss() {
      // debugger;
      this.framePts = "";
      this.base64ImageData = "";
    },
  },
};
</script>

<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="0" v-if="Object.keys(formatInfo).length > 0">
      <template #tab>
        <span>
          <InfoCircleFilled />
          Basic Media Info
        </span>
      </template>
      <a-descriptions title="" bordered size="small" :column="descriptionColumn">
        <!-- iterator all key values in mediaInfo['format'] -->
        <a-descriptions-item v-for="(value, key) in formatInfo" :key="key" :label="key">
          {{ value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-tab-pane>
    <template
      v-for="stream in streamsInfo"
      :key="`Stream ${stream['index']} : ${stream['codec_type']}`"
    >
      <a-tab-pane>
        <template #tab>
          <span>
            <AudioFilled v-if="stream['codec_type'] === 'audio'" />
            <VideoCameraFilled v-else-if="stream['codec_type'] === 'video'" />
            <FileTextFilled v-else />

            {{ `Stream ${stream["index"]} : ${stream["codec_type"]}` }}
          </span>
        </template>

        <a-descriptions title="" bordered size="small" :column="descriptionColumn">
          <a-descriptions-item v-for="(value, key) in stream" :key="key" :label="key">
            {{ value }}
          </a-descriptions-item>
        </a-descriptions>
      </a-tab-pane>
    </template>

    <a-tab-pane :key="showPacketPanelKey">
      <template #tab>
        <span>
          <ProfileFilled />
          {{ `Packets Info (total: ${packets.length})` }}
        </span>
      </template>
      <PacketsTableView
        :packetsInfo="packets"
        @view-frame="showFrame"
        :tablePageSize="tablePageSize"
      />
    </a-tab-pane>

    <template v-if="activeKey === showPacketPanelKey" #rightExtra>
      <a-select
        :options="options"
        v-model:value="selectedOption"
        @change="showPackets"
      ></a-select>
      <a-divider type="vertical" />
      <a-select
        :options="toggle_key_frames_options"
        v-model:value="show_key_frames_only"
        @change="toggle_key_frames"
      ></a-select>
    </template>
  </a-tabs>

  <div>
    <a-modal
      v-model:open="shouldShowFrame"
      height="0.5uw"
      :title="'VideoFrame @ ' + framePts"
      @ok="handleOK"
      @after-close="onFrameWindowDismiss"
    >
      <img :src="base64ImageData" />
    </a-modal>
  </div>
</template>
