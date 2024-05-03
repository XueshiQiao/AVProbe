<script setup>
import { ref } from "vue";
import { SearchOutlined } from "@ant-design/icons-vue";
import CodecDetail from "./CodecDetail.vue";
</script>

<template>
  <a-flex gap="small" vertical>
    <a-typography-title :level="4"> {{ name }}</a-typography-title>
    <a-flex gap="middle" align="center">
      <a-typography-text>Codec Type: </a-typography-text>
      <a-select
        style="width: 100px"
        :options="codecTypeOptions"
        v-model:value="selectedCodecTypeOption"
        @select="onCodecTypeOptionSelected"
      ></a-select>
      <a-typography-text>Filter with keywords: </a-typography-text>
      <a-auto-complete
        v-model:value="searchText"
        :options="[
          { value: '264' },
          { value: 'hevc' },
          { value: 'vpx' },
          { value: 'av1' },
          { value: 'aac' },
          { value: 'mp3' },
          { value: 'opus' },
        ]"
        style="width: 200px"
        placeholder="codec name or description"
      />
    </a-flex>
    <a-table
      :columns="columns"
      :dataSource="filteredCodecs"
      bordered
      :pagination="{
        defaultPageSize: 15,
        pageSizeOptions: ['10', '15', '50', '100', '200'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }"
    >
      <template #bodyCell="{ column, text, record }">
        <template v-if="column.key === 'options'">
          <a-tooltip title="Check codec options">
            <a-button @click="checkOptions(record)">
              <SearchOutlined />
            </a-button>
          </a-tooltip>
        </template>
        <template v-else>
          {{ text }}
        </template>
      </template>
    </a-table>
  </a-flex>

  <a-modal
    v-model:open="presentCodecInfo"
    title="Codec Info"
    width="70%"
    wrap-class-name="full-modal"
    @ok="dismissCodecInfo"
  >
    <CodecDetail :codecInfo="currentCodecDetail" />
  </a-modal>
</template>

<script>

export default {
  props: {
    codecs: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
  },
  created() {
    console.log("Codecs.vue created, codecs: ", this.codecs.length);
    this.filteredCodecs = ref(JSON.parse(JSON.stringify(this.codecs)));

		window.addEventListener("message", async (e) => {
      const { type, body, requestId } = e.data;
      console.log("Codecs.vue Receive ", type, " message from vscode extension, body: ", body);
      switch (type) {
        case "init": {
          console.log("Codecs.vue hello world from vscode extension, body: ", body);
          return;
        }

				case "show_codec_detail": {
					console.log("Codecs.vue receive show_codec_detail body:", body);
          this.currentCodecDetail = this.parseDataToJSON(body);
          console.log("Codecs.vue parseCodecDetail, codec: ", this.currentCodecDetail);
          this.presentCodecInfo = true;
					return;
				};
      }
		});
  },
  watch: {
    // on codecTypeOption changed, refilter codecs
    searchText: {
      handler(newVal, oldVal) {
        console.log(
          "Codecs.vue watch searchText changed, newVal: ",
          newVal,
          ", oldVal: ",
          oldVal
        );
        this.refilterCodecs();
      },
      deep: true,
    },

    // on codecTypeOption changed, copy filteredCodecs
    codecs: {
      handler(newVal, oldVal) {
        console.log(
          "Codecs.vue watch codecs changed, newVal: ",
          newVal.length,
          ", oldVal: ",
          oldVal.length
        );
        this.filteredCodecs = ref(JSON.parse(JSON.stringify(newVal)));
      },
      deep: true,
    },
  },
  data() {
    return {
      columns: ref([
        {
          title: "Codec Name",
          dataIndex: "codec_name",
          key: "codec_name",
          width: 150,
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          width: 300,
        },
        {
          title: "Flags",
          dataIndex: "flags",
          key: "flags",
          width: 100,
        },
        {
          title: "Flags Detail",
          dataIndex: "flags_detail",
          key: "flags_detail",
        },
        {
          title: "Check options",
          key: "options",
          fixed: "right",
          width: 100,
        },
      ]),
      filteredCodecs: ref([]),
      codecTypeOptions: ref([
        { label: "ALL", value: "-" },
        { label: "Audio", value: "A" },
        { label: "Video", value: "V" },
        { label: "Subtitle", value: "S" },
      ]),
      selectedCodecTypeOption: ref("-"),
      searchText: ref(""),
      presentCodecInfo: ref(false),
      currentCodecDetail: ref({}),
    };
  },
  methods: {
    onCodecTypeOptionSelected(value, option) {
      console.log("click value: ", value, ", option: ", option);
      this.selectedCodecTypeOption = value;
      this.refilterCodecs();
    },
    onSearch(value, event, other) {
      console.log("search: [", value, "], searchText: [", this.searchText, "]");
      this.refilterCodecs();
    },
    refilterCodecs() {
      console.log(
        "Codecs.vue refilterCodecs, selectedCodecTypeOption: ",
        this.selectedCodecTypeOption
      );
      var copy = JSON.parse(JSON.stringify(this.codecs));
      // debugger;
      copy = copy
        .filter((item) => {
          const codecType = this.selectedCodecTypeOption.trim();
          return codecType === "-" || item.flags[0] === codecType;
        })
        .filter((item) => {
          const searchText = this.searchText.trim().toLowerCase();
          return (
            searchText.length == 0 ||
            item.description.toLowerCase().includes(searchText) ||
            item.codec_name.toLowerCase().includes(searchText)
          );
        });
      this.filteredCodecs = ref(copy);
    },
    checkOptions(codec) {
      console.log("Codecs.vue checkOptions, codec: ", codec);
      this.currentCodec = codec;
      vscode.postMessage({
        type: "show_codec_detail",
        isEncoder: codec.is_encoder,
        codecName: codec.codec_name,
      });
    },
    dismissCodecInfo() {
      this.presentCodecInfo = false;
      this.currentCodecDetail = {};
    },

    ////

    getValuesFromLine(line) {
      const keyValues = line.split(': ')
      if (keyValues.length < 2) {
        return []
      }

      const values = keyValues[1].split(' ').filter(function(str) {
        return str.length > 0
      })
      return values;
    },

    /*
    ffmpeg/libavutil/opt.c:

    static void opt_list(void *obj, void *av_log_obj, const char *unit,

    av_log(av_log_obj, AV_LOG_INFO, "%c%c%c%c%c%c%c%c%c%c%c",
    (opt->flags & AV_OPT_FLAG_ENCODING_PARAM)  ? 'E' : '.',
    (opt->flags & AV_OPT_FLAG_DECODING_PARAM)  ? 'D' : '.',
    (opt->flags & AV_OPT_FLAG_FILTERING_PARAM) ? 'F' : '.',
    (opt->flags & AV_OPT_FLAG_VIDEO_PARAM)     ? 'V' : '.',
    (opt->flags & AV_OPT_FLAG_AUDIO_PARAM)     ? 'A' : '.',
    (opt->flags & AV_OPT_FLAG_SUBTITLE_PARAM)  ? 'S' : '.',
    (opt->flags & AV_OPT_FLAG_EXPORT)          ? 'X' : '.',
    (opt->flags & AV_OPT_FLAG_READONLY)        ? 'R' : '.',
    (opt->flags & AV_OPT_FLAG_BSF_PARAM)       ? 'B' : '.',
    (opt->flags & AV_OPT_FLAG_RUNTIME_PARAM)   ? 'T' : '.',
    (opt->flags & AV_OPT_FLAG_DEPRECATED)      ? 'P' : '.');
    */
    parseFlags(flagsString) {
      let mapping = {
        'E': "Encoding Param",
        'D': "Decoding Param",
        'F': "Filtering Param",
        'V': "Video Param",
        'A': "Audio Param",
        'S': "Subtitle Param",
        'X': "Export",
        'R': "Readonly",
        'B': "BSF Param",
        'T': "Runtime Param",
        'P': "Deprecated",
      }

      var flags = []
      for (const char of flagsString) {
        const flag = mapping[char]
        if (flag) {
          flags.push(flag);
        }
      }
      return flags;
    },

    // FFmpeg src ref: ffmpeg/fftools/opt_common.c: static void print_codec(const AVCodec *c)
    parseDataToJSON(dataString) {
      const lines = dataString.split('\n');
      const result = {
        codec:                    {},
        generalCapabilities:      [],
        threadingCapabilities:    [],
        supportedPixelFormats:    [],
        supportedFramerates:      [],
        supportedHardwareDevices: [],
        supportedSampleFormats:   [],
        supportedSampleRates:     [],
        supportedChannelLayouts:  [],
        AVOptions: [],
      };

      /*
      matches 3 cases:
      variance        1            E..V....... Variance based Aq
      default                      E..V....... Improve resiliency against losses of whole frames
      psnr            0            E..V.......
      */
      let optionExtractRegex = /^(?!-)(\S+)\s+(\S*)\s+([EDFVASXRBTP\.]+)\s*(.*)/

      for (const line_ of lines) {
        const line = line_.trim();
        // hit: "Encoder libaom-av1 [libaom AV1]:"
        if (line.startsWith('Encoder') || line.startsWith("Decoder")) {
          const [, type, name, longName] = line.match(/([ED][ne]coder) (.+) \[(.*)\]:/);
          result.codec = {
            type: type.toLowerCase(),
            name,
            longName
          };
        } else if (line.startsWith('General capabilities:')) {
          result.generalCapabilities = this.getValuesFromLine(line);
        } else if (line.startsWith('Threading capabilities:')) {
          result.threadingCapabilities = this.getValuesFromLine(line);
        } else if (line.startsWith('Supported pixel formats:')) {
          result.supportedPixelFormats = this.getValuesFromLine(line).sort();
        } else if (line.startsWith('Supported framerates:')) {
          result.supportedFramerates = this.getValuesFromLine(line)
        } else if (line.startsWith('Supported sample rates:')) {
          result.supportedSampleRates = this.getValuesFromLine(line)
        } else if (line.startsWith('Supported sample formats:')) {
          result.supportedSampleFormats = this.getValuesFromLine(line)
        } else if (line.startsWith('Supported hardware devices:')) {
          result.supportedHardwareDevices = this.getValuesFromLine(line)
        } else if (line.startsWith('Supported channel layouts:')) {
          result.supportedChannelLayouts = this.getValuesFromLine(line)

          // matches line: "libaom-av1 encoder AVOptions:"
        } else if (/.*\sAVOptions:\s*/.test(line)) {
          // ignore
          continue;

          // matches flag lines like: "-cpu-used          <int>        E..V....... Quality/Speed ratio modifier (from 0 to 8) (default 1)"
        } else if (line.startsWith('-')) {
          let [, name, type, flags, description] = line.match(/\s*(-\S+)\s+(\S+)\s+([EDFVASXRBTP\.]+)\s+(.*)/)
          flags = this.parseFlags(flags);
          result.AVOptions.push({
            name,
            type,
            flags,
            description,
            options: []
          })
          // match flag option value lines like: "good            0            E..V....... Good quality"
        } else if (optionExtractRegex.test(line)) {
          let [, name, value, flags, description] = line.match(optionExtractRegex)
          flags = this.parseFlags(flags);
          result.AVOptions[result.AVOptions.length-1].options.push({
            name,
            value,
            flags,
            description
          })
        } else {
          if (line.length > 0) {
            console.error("unrecognized line: ", line, ", codec name: ", result.encoder)
          }
        }
      }

      return result;
    },
  },
};
</script>
