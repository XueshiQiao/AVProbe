<script setup>
import { ref } from "vue";
import BasicMediaInfo from "./BasicMediaInfo.vue";
import Codecs from "./Codecs.vue";
</script>
<script>
function matchRegex(str, regex) {
  str = str.trim();
  const match = str.match(regex);
  if (match && match.length > 1) {
    return match.slice(1);
  } else {
    return [];
  }
}

///////////

function parseFlags(flags_str, flags_map) {
  const type_flag = flags_str[0];
  const type = flags_map.get(type_flag + ".".repeat(5));

  const flags = flags_str
    .split("")
    .map((character, index) => {
      let flagKey =
        ".".repeat(index) + character + ".".repeat(flags_str.length - 1 - index);
      return flags_map.get(flagKey);
    })
    .filter(Boolean);

  return {
    flags_str,
    type,
    flags,
  };
}

function parseCodecs(input) {
  const regex1 = /(\S+)\s+(=)\s+(.*)/;
  const regex2 = /(\S+)\s+(\S+)\s+(.*)/;

  const dataArray = input.split("\n").filter((line) => line.trim() !== "");

  let flags_map = new Map();
  let codecs_array = [];

  dataArray.forEach(function (line) {
    let ret = matchRegex(line, regex1);
    if (ret.length == 3) {
      console.log("is header");
      //      flags_array.push(ret)
      flags_map.set(ret[0], ret[2]);
      return;
    }

    ret = matchRegex(line, regex2);
    if (ret.length == 3) {
      codecs_array.push(ret);
      console.log("is codec");
      return;
    }

    console.log("unexpected line: ", line);
  });

  flags_map.forEach((value, key) => {
    console.log(`Key: ${key}, Value: ${value}`);
  });

	const completed = codecs_array.map((codec) => {
		const flags_detail_array = parseFlags(codec[0], flags_map)
    return {
      codec_name: codec[1],
      description: codec[2],
      flags: codec[0],
      flags_detail: flags_detail_array['flags'].join(", \n"),
    };
  });

  return completed;
}

export default {
  name: "Header",
  props: {},
  // life cycle method
  created() {
    console.log("Header.vue created");
    this.options = ref([
      {
        label: "All Streams",
        value: "-1",
      },
    ]);

    window.addEventListener("message", async (e) => {
      const { type, body, requestId } = e.data;
      console.log(
        "Header.vue Receive ",
        type,
        " message from vscode extension, body: ",
        body
      );
      switch (type) {
        case "init": {
          console.log("Header.vue hello world from vscode extension, body: ", body);
          // how to update ref(*) type value?
          // this.filePath.value = body["filePath"] ?? "";
          // this.fileSize = Number(body["fileSize"]) ?? 0;
          this.fileInfo["filePath"] = body["filePath"] ?? "";
          this.fileInfo["fileSize"] = Number(body["fileSize"]) ?? 0;
          console.log(
            "Header.vue filePath: ",
            this.filePath,
            ", fileSize: ",
            this.fileSize
          );

          this.showInformation();
          this.showDecoders();
					this.showEncoders();
          return;
        }
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
              if (
                this.options.findIndex((option) => option.value === stream["index"]) ===
                -1
              ) {
                this.options.push({
                  label: stream["codec_type"] + "-" + stream["index"],
                  value: stream["index"],
                });
              }
            });
          }
          return;
        }
        case "packets": {
          const packetsDict = JSON.parse(body);
          if (
            packetsDict &&
            packetsDict["packets"] !== undefined &&
            Array.isArray(packetsDict["packets"])
          ) {
            this.packetsInfo = packetsDict["packets"];
            this.packetsInfo.forEach((packet, index) => {
              packet["key"] = index.toString();
            });
          }
          console.log(
            "Header.vue Receive 'packets' message from vscode extension, packets: ",
            this.packetsInfo
          );
          return;
        }
				case "show_decoders": {
					console.log("receive body:", body);
					this.decoders = parseCodecs(body);
					console.log(
						"Header.vue Receive 'show_decoders' message from vscode extension, decoders: ",
						this.decoders
					);
					return;
				};
				case "show_encoders": {
					console.log("receive body:", body);
					this.encoders = parseCodecs(body);
					console.log(
						"Header.vue Receive 'show_decoders' message from vscode extension, decoders: ",
						this.encoders
					);
					return;
				};
      }
    });

    vscode.postMessage({ type: "ready" });
  },
  data() {
    return {
      fileInfo: ref({}),
      isInfoVisible: ref(false),
      size: ref("default"),
      gapSize: ref("small"),
      customGapSize: ref(0),
      options: ref([]),
      // ----------------
      mediaInfo: ref({}),
      formatInfo: ref({}),
      streamsInfo: ref([]),
      packetsInfo: ref([]),
      openEncoders: ref(false),
      openDecoders: ref(false),
      decoders: ref([]),
      encoders: ref([]),
      // ----------------
    };
  },
  methods: {
    showInformation() {
      vscode.postMessage({ type: "probe" });
    },
    showDecoders() {
      vscode.postMessage({ type: "show_decoders" });
    },
		showEncoders() {
      vscode.postMessage({ type: "show_encoders" });
    },
    handleClick() {
      console.log("click");
    },
    showDecodersModal() {
      console.log("showModal open:", this.open);
      this.openDecoders = true;
    },
		showEncodersModal() {
      console.log("showModal open:", this.open);
      this.openEncoders = true;
    },
		dismissDecodersModal(e) {
      console.log(e);
      this.openDecoders = false;
		},
    dismissEncodersModal(e) {
      console.log(e);
      this.openEncoders = false;
		},

  },
};
</script>

<template>
  <a-flex gap="middle" vertical>
    <a-row>
      <a-col :span="24">
        <a-card title="Media file">
          <a-descriptions
            title=""
            bordered
            size="small"
            :column="{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }"
          >
            <a-descriptions-item label="Path">
              {{ fileInfo["filePath"] }}
            </a-descriptions-item>
            <a-descriptions-item label="Size">
              {{ (fileInfo["fileSize"] / 1000.0 / 1000.0).toFixed(2) }} MB ({{
                fileInfo["fileSize"]
              }}
              bytes)
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>

    <BasicMediaInfo
      :formatInfo="formatInfo"
      :streamsInfo="streamsInfo"
      :packetsInfo="packetsInfo"
      :options="options"
    />
  </a-flex>

  <a-float-button type="primary"
    :style="{
      right: '24px',
    }"
		@click="showDecodersModal" />

  <a-float-button type="default"
    :style="{
      right: '94px',
    }"
		@click="showEncodersModal" />

  <a-modal
    v-model:open="openDecoders"
    title="Decoders"
    width="70%"
    wrap-class-name="full-modal"
    @ok="dismissDecodersModal"
  >
    <p>Codecs</p>
    <Codecs :decoders="decoders" />
  </a-modal>

	<a-modal
    v-model:open="openEncoders"
    title="Encoders"
    width="70%"
    wrap-class-name="full-modal"
    @ok="dismissEncodersModal"
  >
    <p>Codecs</p>
    <Codecs :decoders="encoders" />
  </a-modal>
  <!-- <Codecs :decoders="decoders" /> -->
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
<style lang="less">
.full-modal {
  .ant-modal {
    max-width: 70%;
    height: 80%;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: 80%;
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
